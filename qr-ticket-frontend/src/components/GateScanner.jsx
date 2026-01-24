// ======================= IMPORTS =======================

// React hooks:
// useEffect → lifecycle (mount / unmount)
// useRef    → mutable values without re-render
// useState  → UI state
import { useEffect, useRef, useState } from "react";

// html5-qrcode library (camera + QR decoding)
import { Html5Qrcode } from "html5-qrcode";

// Axios instance for backend API calls
import axiosClient from "../api/axiosClient";

// ======================= COMPONENT =======================

function GateScanner() {

    // ======================= REFS (NO RE-RENDER) =======================

    const scannerRef = useRef(null);          // Html5Qrcode instance
    const isCameraRunningRef = useRef(false); // camera active
    const scanLockedRef = useRef(false);      // block duplicate scans
    const isTransitioningRef = useRef(false); // prevent race conditions

    // ======================= STATE (CAUSES UI UPDATE) =======================

    const [detectedText, setDetectedText] = useState(null);
    const [status, setStatus] = useState(null);

    // ======================= COMPONENT LIFECYCLE =======================

    useEffect(() => {
        scannerRef.current = new Html5Qrcode("qr-reader");

        setTimeout(startScanner, 1000);

        return stopAndClearScanner;
    }, []);

    // ======================= START CAMERA =======================

    const startScanner = async () => {
        if (
            !scannerRef.current ||
            !document.getElementById("qr-reader") ||
            isCameraRunningRef.current ||
            isTransitioningRef.current
        ) return;

        try {
            isTransitioningRef.current = true;

            await scannerRef.current.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                onScanSuccess,
                () => { }
            );

            isCameraRunningRef.current = true;
            scanLockedRef.current = false;

        } catch (err) {
            console.error("Camera start failed", err);
        } finally {
            isTransitioningRef.current = false;
        }
    };

    // ======================= STOP + CLEAR CAMERA =======================

    const stopAndClearScanner = async () => {
        const scanner = scannerRef.current;
        if (!scanner || isTransitioningRef.current) return;

        try {
            isTransitioningRef.current = true;

            if (scanner.getState?.() === 2) await scanner.stop();
            await scanner.clear();

            isCameraRunningRef.current = false;

        } catch (err) {
            console.warn("Stop/Clear ignored:", err);
        } finally {
            isTransitioningRef.current = false;
        }
    };

    // ======================= SCAN CALLBACK =======================

    const onScanSuccess = (decodedText) => {
        if (scanLockedRef.current) return;
        scanLockedRef.current = true;

        setDetectedText(decodedText);
        setStatus(null);

        setTimeout(async () => {
            await stopAndClearScanner();
            await validateTicket(decodedText);

            setTimeout(() => {
                setDetectedText(null);
                setStatus(null);
                // startScanner();
            }, 3000);
        }, 0);
    };

    // ======================= BACKEND API =======================

    const validateTicket = async (qrHash) => {
        try {
            const { data } = await axiosClient.post(
                "/api/ticket/validate",
                { qrHash }
            );
            setStatus(data.status);
        } catch {
            setStatus("ERROR");
        }
    };

    // ======================= UI =======================

    return (
        <div style={{ padding: "20px" }}>
            <h3>Gate QR Scanner</h3>

            {/* 
                🔑 CRITICAL RULE:
                This div MUST ALWAYS stay in the DOM.
                Visibility is controlled via CSS.
            */}
            <div
                id="qr-reader"
                style={{
                    width: 320,
                    height: 320,
                    border: "2px solid black",
                    display: detectedText ? "none" : "block"
                }}
            />

            {detectedText && (
                <div>
                    <p><strong>Detected QR:</strong></p>
                    <code>{detectedText}</code>
                </div>
            )}

            {status && (
                <p style={{ fontWeight: "bold" }}>
                    Status: {status}
                </p>
            )}
        </div>
    );
}

export default GateScanner;

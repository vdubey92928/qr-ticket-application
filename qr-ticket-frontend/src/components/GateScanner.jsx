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

    // Holds the Html5Qrcode instance (camera controller)
    const scannerRef = useRef(null);

    // True when camera is actively scanning
    const isCameraRunningRef = useRef(false);

    // Prevents scanning the same QR multiple times
    const scanLockedRef = useRef(false);

    // Prevents start/stop being called at the same time
    // 🔥 THIS FIXES "already under transition" ERROR
    const isTransitioningRef = useRef(false);

    // ======================= STATE (CAUSES UI UPDATE) =======================

    // Stores last scanned QR value
    const [detectedText, setDetectedText] = useState(null);

    // Stores ticket validation status
    const [status, setStatus] = useState(null);

    // ======================= COMPONENT LIFECYCLE =======================

    useEffect(() => {
        // Create scanner instance ONCE when component mounts
        // It binds internally to the DOM element with id="qr-reader"
        scannerRef.current = new Html5Qrcode("qr-reader");

        // Delay start so React finishes rendering the DOM
        setTimeout(() => {
            startScanner();
        }, 0);

        // Cleanup when component unmounts
        return () => {
            stopAndClearScanner();
        };
    }, []);

    // ======================= START CAMERA =======================

    const startScanner = async () => {
        const scanner = scannerRef.current;
        const container = document.getElementById("qr-reader");

        // HARD guards to avoid illegal state transitions
        if (
            !scanner ||                    // scanner not created
            !container ||                  // DOM not ready
            isCameraRunningRef.current ||  // already running
            isTransitioningRef.current     // stop/clear in progress
        ) {
            return;
        }

        try {
            // Lock transitions
            isTransitioningRef.current = true;

            // Start camera + scanning
            await scanner.start(
                { facingMode: "environment" }, // use back camera
                { fps: 10, qrbox: 250 },        // scan config
                onScanSuccess,                  // success callback
                () => { }                        // ignore scan errors
            );

            // Mark camera running
            isCameraRunningRef.current = true;

            // Allow scanning
            scanLockedRef.current = false;

        } catch (err) {
            console.error("Camera start failed", err);
        } finally {
            // Unlock transitions
            isTransitioningRef.current = false;
        }
    };

    // ======================= STOP + CLEAR CAMERA =======================

    const stopAndClearScanner = async () => {
        const scanner = scannerRef.current;

        // Do nothing if scanner missing or already transitioning
        if (!scanner || isTransitioningRef.current) return;

        try {
            // Lock transitions
            isTransitioningRef.current = true;

            // Stop camera ONLY if currently scanning
            // html5-qrcode state "2" = SCANNING
            if (scanner.getState && scanner.getState() === 2) {
                await scanner.stop();
            }

            // Clear scanner and RELEASE MediaStream
            // 🔥 THIS TURNS OFF CAMERA LED
            await scanner.clear();

            // Update camera state
            isCameraRunningRef.current = false;

        } catch (err) {
            // Ignore library race-condition errors
            console.warn("Stop/Clear ignored:", err);
        } finally {
            // Unlock transitions
            isTransitioningRef.current = false;
        }
    };

    // ======================= SCAN CALLBACK =======================

    const onScanSuccess = (decodedText) => {

        // Block duplicate scans
        if (scanLockedRef.current) return;
        scanLockedRef.current = true;

        // Update UI
        setDetectedText(decodedText);
        setStatus(null);

        // IMPORTANT:
        // html5-qrcode calls this INSIDE its scan loop.
        // We must exit the loop before stopping camera.
        setTimeout(async () => {

            // Turn OFF camera completely
            await stopAndClearScanner();

            // Validate QR with backend
            await validateTicket(decodedText);

            // Restart camera AFTER 3 seconds
            setTimeout(() => {
                setDetectedText(null); // clear UI
                setStatus(null);       // reset status
                startScanner();        // restart camera
            }, 3000);

        }, 0);
    };

    // ======================= BACKEND API =======================

    const validateTicket = async (qrHash) => {
        try {
            const response = await axiosClient.post(
                "/api/ticket/validate",
                { qrHash }
            );

            // Show backend status (VALID / INVALID)
            setStatus(response.data.status);

        } catch {
            // Network / server error
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
                    width: "320px",
                    height: "320px",
                    border: "2px solid black",
                    display: detectedText ? "none" : "block"
                }}
            />

            {/* Display scanned QR */}
            {detectedText && (
                <div>
                    <p><strong>Detected QR:</strong></p>
                    <code>{detectedText}</code>
                </div>
            )}

            {/* Display validation result */}
            {status && (
                <p style={{ fontWeight: "bold" }}>
                    Status: {status}
                </p>
            )}
        </div>
    );
}

export default GateScanner;

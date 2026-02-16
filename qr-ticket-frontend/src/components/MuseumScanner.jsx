import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axiosClient from "../api/axiosClient";

function MuseumScanner() {

    const scannerRef = useRef(null);
    const isCameraRunningRef = useRef(false);
    const scanLockedRef = useRef(false);
    const isTransitioningRef = useRef(false);

    const [detectedText, setDetectedText] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        scannerRef.current = new Html5Qrcode("qr-reader");
        setTimeout(startScanner, 800);
        return stopAndClearScanner;
    }, []);

    const startScanner = async () => {
        if (!scannerRef.current || isCameraRunningRef.current || isTransitioningRef.current) return;

        try {
            isTransitioningRef.current = true;

            await scannerRef.current.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                onScanSuccess
            );

            isCameraRunningRef.current = true;
            scanLockedRef.current = false;

        } catch (err) {
            console.error("Camera start failed", err);
        } finally {
            isTransitioningRef.current = false;
        }
    };

    const stopAndClearScanner = async () => {
        const scanner = scannerRef.current;
        if (!scanner || isTransitioningRef.current) return;

        try {
            isTransitioningRef.current = true;

            if (scanner.getState?.() === 2) await scanner.stop();
            await scanner.clear();

            isCameraRunningRef.current = false;
        } finally {
            isTransitioningRef.current = false;
        }
    };

    const onScanSuccess = (decodedText) => {
        if (scanLockedRef.current) return;
        scanLockedRef.current = true;

        setDetectedText(decodedText);
        setResult(null);

        setTimeout(async () => {
            await stopAndClearScanner();
            await validateTicket(decodedText);

            setTimeout(() => {
                setDetectedText(null);
                setResult(null);
                startScanner();
            }, 3000);
        }, 0);
    };

    const validateTicket = async (qrHash) => {
        try {
            const { data } = await axiosClient.post("/api/ticket/scan", {
                qrHash,
                location: "MUSEUM"
            });

            setResult(data);
        } catch {
            setResult({
                success: false,
                message: "Server error"
            });
        }
    };

    const getBgColor = () => {
        if (!result) return "#fff";
        return result.success ? "#d4edda" : "#f8d7da";
    };

    return (
        <div style={{ padding: 20, background: getBgColor(), minHeight: "100vh" }}>
            <h2 className="text-center mb-3">Museum QR Scanner</h2>

            <div
                id="qr-reader"
                style={{
                    width: 320,
                    height: 240,
                    border: "2px solid black",
                    display: detectedText ? "none" : "block"
                }}
            />

            {detectedText && (
                <div className="mt-3">
                    <strong>QR:</strong>
                    <div>{detectedText}</div>
                </div>
            )}

            {result && (
                <div className="mt-3">
                    <h3>{result.message}</h3>
                    <p>Result: {result.result}</p>
                </div>
            )}
        </div>
    );
}

export default MuseumScanner;


import React from "react";

import ldaLogo from "../../public/logos/lda.png"

const TicketQrView = React.forwardRef(({ ticket, type }, ref) => {
    return (

        <div ref={ref}
            style={{
                width: "260px",
                border: "2px dashed #444",
                padding: "12px",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#fff",
            }}
        >
            {/* ================= HEADER ================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginBottom: "8px",
                }}
            >
                {/* LEFT LOGO */}
                <img
                    src={ldaLogo}
                    alt="Prerna Sthal Logo"
                    style={{ height: "30px" }}
                />
                <small style={{ margin: "2px 0", fontWeight: "bold" }}>
                    Rastriya Prerna Sthal
                </small>
                {/* RIGHT LOGO */}
                <img
                    src={ldaLogo}
                    alt="LDA Logo"
                    style={{ height: "30px" }}
                />
            </div>

            {/* ================= TITLE ================= */}

            <hr style={{ margin: "8px 0" }} />

            {/* ================= WELCOME MESSAGE ================= */}
            <p style={{ fontSize: "12px", marginBottom: "6px" }}>
                <strong>Welcome</strong>
            </p>

            {/* ================= QR ================= */}
            <img
                src={`http://localhost:8082/api/ticket/get/${ticket}`}
                alt="Ticket QR"
                width="140"
                height="140"
                style={{ marginBottom: "6px" }}
            />

            {/* ================= TICKET TYPE ================= */}
            <p
                style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    margin: "0",
                    textTransform: "uppercase",
                }}
            >
                {type} Ticket
            </p>


            <p style={{ fontSize: "11px", margin: "10", color: "#555" }}>
                Lucknow Development Authority
            </p>
        </div>

    );
});

export default TicketQrView;







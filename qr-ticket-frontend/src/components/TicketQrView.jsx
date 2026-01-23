import React, { useEffect, useState } from "react";
import ldaLogo from "../../public/logos/lda.png";
import axiosClient from "../api/axiosClient";
import './../assets/css/ticket.css'

const TicketQrView = React.forwardRef(({ ticketData }, ref) => {

    return (
        <div ref={ref} id="ticket_wrap">
            {/* ================= HEADER ================= */}
            <div id="ticket_header">
                <img src={ldaLogo} alt="Logo" style={{ height: "28px" }} />

                <div className="text-center">
                    <div style={{ fontSize: "11px", fontWeight: "bold" }}>
                        Rastriya Prerna Sthal
                    </div>
                    <div style={{ fontSize: "9px", color: "#666" }}>
                        Lucknow Development Authority
                    </div>
                </div>

                <img src={ldaLogo} alt="Logo" style={{ height: "28px" }} />
            </div>

            <hr style={{ border: "1px solid #ccc", margin: "8px 0" }} />

            {/* ================= TICKET INFO ================= */}
            <div id="top_detail">
                <p>Ticket ID: {ticketData.id}</p>
                <p>
                    Visit Date:{" "}
                    {new Date(ticketData.visitDate).toLocaleDateString("en-GB")}
                </p>

            </div>

            {/* ================= QR ================= */}
            <div className="text-center">
                {ticketData.qrImage && (
                    <img
                        src={`data:image/png;base64,${ticketData.qrImage}`}
                        alt="Ticket QR"
                        width="170"
                        height="170"
                    />
                )}
            </div>

            {/* ================= TYPE + PRICE ================= */}
            <div id="ticket_info">
                {ticketData.type} Ticket {ticketData.type == 'KID' && (<span>0-7 yr</span>)}
            </div>

            <div
                style={{
                    textAlign: "center",
                    fontSize: "12px",
                    marginBottom: "6px",
                }}
            >
                Price: ₹{ticketData.price}
            </div>

            <hr style={{ border: "1px dashed #aaa", margin: "8px 0" }} />

            {/* ================= FOOTER ================= */}
            <div id="ticekt_inst">
                Please keep this ticket safe.<br />
                QR code must be scanned at entry.
            </div>
        </div>
    );
});

export default TicketQrView;

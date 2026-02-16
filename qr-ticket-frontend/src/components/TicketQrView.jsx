import React from "react";
import ldaLogo from "../assets/logos/lda.png";

const TicketQrView = React.forwardRef(({ ticketData, count }, ref) => {

    const visitDate = new Date(ticketData.visitDate).toLocaleDateString("en-GB");

    const getValidForLabel = () => {
        switch (ticketData.validFor) {
            case "GATE": return "Gate Entry Only";
            case "MUSEUM": return "Museum Entry Only";
            default: return "Gate + Museum Entry";
        }
    };

    const getValidForColor = () => {
        switch (ticketData.validFor) {
            case "GATE": return "#3b82f6";
            case "MUSEUM": return "#f59e0b";
            default: return "#10b981";
        }
    };

    return (
        <>
            <style>{`
                .ticket-card {
                    background: #ffffff;
                    width: 320px;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 0 auto;
                    border: 1px solid #e2e8f0;
                }
                .ticket-header {
                    background: linear-gradient(135deg,#f8fafc,#e2e8f0);
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px dashed #cbd5e1;
                }
                .logo-img { height: 35px; }
                .header-text { text-align:center; flex-grow:1; }
                .venue-name { font-size:13px; font-weight:800; }
                .auth-name { font-size:8px; color:#64748b; }

                .ticket-body { padding:20px; text-align:center; }
                .info-row {
                    display:flex; justify-content:space-between;
                    margin-bottom:20px; font-size:11px;
                    background:#f1f5f9; padding:8px 12px;
                    border-radius:8px;
                }
                .qr-container { margin-bottom:15px; }
                .ticket-type { font-size:20px; font-weight:900; margin-bottom:5px; }
                .price-tag { font-size:18px; font-weight:700; color:#10b981; }

                .valid-badge {
                    margin-top:10px;
                    padding:6px 12px;
                    border-radius:20px;
                    color:white;
                    font-weight:bold;
                    font-size:11px;
                    display:inline-block;
                }

                .ticket-footer {
                    background:#1e293b; color:#94a3b8;
                    padding:10px; text-align:center;
                    font-size:9px;
                }
            `}</style>

            <div ref={ref} className="ticket-card">

                <div className="ticket-header">
                    <img src={ldaLogo} alt="LDA" className="logo-img" />
                    <div className="header-text">
                        <div className="venue-name">Rashtriya Prerna Sthal</div>
                        <div className="auth-name">LUCKNOW DEVELOPMENT AUTHORITY</div>
                    </div>
                    <img src={ldaLogo} alt="LDA" className="logo-img" style={{ opacity: 0.7 }} />
                </div>

                <div className="ticket-body">

                    <div className="info-row">
                        <span>TICKET NO: <strong>{count}</strong></span>
                        <span>DATE: <strong>{visitDate}</strong></span>
                    </div>

                    <div className="qr-container">
                        <img
                            src={`data:image/png;base64,${ticketData.qrImage}`}
                            alt="Ticket QR"
                            width="160"
                        />
                    </div>

                    <div className="ticket-type">{ticketData.type} TICKET</div>
                    <div className="price-tag">₹{ticketData.price}/-</div>

                    {/* 🔥 NEW VALID FOR BADGE */}
                    <div
                        className="valid-badge"
                        style={{ background: getValidForColor() }}
                    >
                        {getValidForLabel()}
                    </div>

                </div>

                <div className="ticket-footer">
                    Show QR at Gate Scanner • Non-Refundable
                </div>
            </div>
        </>
    );
});

export default TicketQrView;

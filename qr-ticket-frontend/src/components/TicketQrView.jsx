import React from "react";
import ldaLogo from "../assets/logos/lda.png";

const TicketQrView = React.forwardRef(({ ticketData }, ref) => {
    return (
        <>
            <style>{`
                /* --- MODERN TICKET CSS --- */
                .ticket-card {
                    background: #ffffff;
                    width: 320px;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    position: relative;
                    margin: 0 auto;
                    color: #333;
                    border: 1px solid #e2e8f0;
                }

                /* Header Section */
                .ticket-header {
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px dashed #cbd5e1;
                    position: relative;
                }

                /* Cutouts (The circles on sides) */
                .cutout {
                    position: absolute;
                    bottom: -10px;
                    width: 20px;
                    height: 20px;
                    background: #0f172a; /* Match your page background color */
                    border-radius: 50%;
                    z-index: 10;
                }
                .cutout-left { left: -10px; }
                .cutout-right { right: -10px; }

                .logo-img {
                    height: 35px;
                    object-fit: contain;
                }

                .header-text {
                    text-align: center;
                    flex-grow: 1;
                    padding: 0 5px;
                }

                .venue-name {
                    font-size: 13px;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #1e293b;
                    letter-spacing: 0.5px;
                }

                .auth-name {
                    font-size: 8px;
                    color: #64748b;
                    font-weight: 600;
                    margin-top: 2px;
                }

                /* Body Section */
                .ticket-body {
                    padding: 20px;
                    text-align: center;
                }

                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #475569;
                    background: #f1f5f9;
                    padding: 8px 12px;
                    border-radius: 8px;
                }

                .qr-container {
                    padding: 10px;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    display: inline-block;
                    margin-bottom: 15px;
                    background: #fff;
                }

                .ticket-type {
                    font-size: 20px;
                    font-weight: 900;
                    text-transform: uppercase;
                    color: #0f172a;
                    margin-bottom: 5px;
                }

                .age-badge {
                    font-size: 10px;
                    background: #3b82f6;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 10px;
                    vertical-align: middle;
                    margin-left: 6px;
                    font-weight: normal;
                }

                .price-tag {
                    font-size: 18px;
                    font-weight: 700;
                    color: #10b981; /* Green */
                }

                /* Footer Section */
                .ticket-footer {
                    background: #1e293b;
                    color: #94a3b8;
                    padding: 10px;
                    text-align: center;
                    font-size: 9px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
            `}</style>

            <div ref={ref} className="ticket-card">
                
                {/* --- HEADER --- */}
                <div className="ticket-header">
                    <img src={ldaLogo} alt="LDA" className="logo-img" />
                    
                    <div className="header-text">
                        <div className="venue-name">Rashtriya Prerna Sthal</div>
                        <div className="auth-name">LUCKNOW DEVELOPMENT AUTHORITY</div>
                    </div>
                    
                    <img src={ldaLogo} alt="LDA" className="logo-img" style={{opacity: 0.7}} />

                    {/* Cutout Circles for tear effect */}
                    <div className="cutout cutout-left"></div>
                    <div className="cutout cutout-right"></div>
                </div>

                {/* --- BODY --- */}
                <div className="ticket-body">
                    
                    {/* Meta Data Row */}
                    <div className="info-row">
                        <span>ID: <strong>#{ticketData.id}</strong></span>
                        <span>DATE: <strong>{new Date(ticketData.visitDate).toLocaleDateString("en-GB")}</strong></span>
                    </div>

                    {/* QR Code */}
                    <div className="qr-container">
                        {ticketData.qrImage ? (
                            <img
                                src={`data:image/png;base64,${ticketData.qrImage}`}
                                alt="Ticket QR"
                                width="160"
                                height="160"
                                style={{ display: 'block' }}
                            />
                        ) : (
                            <div style={{width:160, height:160, background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <span style={{fontSize:'10px'}}>Loading QR...</span>
                            </div>
                        )}
                    </div>

                    {/* Ticket Details */}
                    <div className="ticket-type">
                        {ticketData.type} TICKET
                        {ticketData.type === 'KID' && <span className="age-badge">CHILD (5-12)</span>}
                        {ticketData.type === 'ADULT' && <span className="age-badge" style={{background:'#64748b'}}>ADULT (12+)</span>}
                    </div>

                    <div className="price-tag">
                        ₹{ticketData.price}/-
                    </div>
                </div>

                {/* --- FOOTER --- */}
                <div className="ticket-footer">
                    Non-Refundable • Show QR at Entry Gate
                </div>
            </div>
        </>
    );
});

export default TicketQrView;
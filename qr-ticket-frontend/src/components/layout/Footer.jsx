const Footer = () => {
    return (
        <footer className="bg-dark text-light mt-5 pt-4 pb-3">
            <div className="container">
                <div className="row">

                    <div className="col-md-4 mb-3">
                        <h5>QR Ticket Generator</h5>
                        <p className="small">
                            Secure QR-based ticketing system for events, parking, and access control.
                        </p>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h6>Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li>Home</li>
                            <li>Generate Ticket</li>
                            <li>Gallery</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h6>Connect</h6>
                        <i className="fab fa-github me-3"></i>
                        <i className="fab fa-linkedin me-3"></i>
                        <i className="fab fa-twitter"></i>
                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center small">
                    © 2026 QR Ticket Generator | All Rights Reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;

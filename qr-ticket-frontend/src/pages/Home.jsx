import Navbar from "../components/layout/Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            {/* ================= HERO SECTION ================= */}
            <section
                className="d-flex align-items-center text-center text-light"
                style={{
                    minHeight: "90vh",
                    background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                }}
            >
                <div className="container">
                    <h1 className="display-4 fw-bold">
                        QR Ticket Generator System
                    </h1>
                    <p className="lead mt-3">
                        Secure • Contactless • Real-time Ticket Validation
                    </p>

                    <div className="mt-4">
                        <a href="/generate" className="btn btn-light btn-lg me-3">
                            Generate Ticket
                        </a>
                        <a href="#features" className="btn btn-outline-light btn-lg">
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">How It Works</h2>

                    <div className="row text-center">
                        <div className="col-md-3">
                            <i className="fa fa-edit fa-3x text-primary mb-3"></i>
                            <h5>Enter Details</h5>
                            <p className="text-muted">
                                Fill ticket or vehicle information.
                            </p>
                        </div>

                        <div className="col-md-3">
                            <i className="fa fa-qrcode fa-3x text-success mb-3"></i>
                            <h5>Generate QR</h5>
                            <p className="text-muted">
                                Unique QR code generated instantly.
                            </p>
                        </div>

                        <div className="col-md-3">
                            <i className="fa fa-camera fa-3x text-warning mb-3"></i>
                            <h5>Scan at Entry</h5>
                            <p className="text-muted">
                                QR scanned for validation.
                            </p>
                        </div>

                        <div className="col-md-3">
                            <i className="fa fa-check-circle fa-3x text-danger mb-3"></i>
                            <h5>Access Granted</h5>
                            <p className="text-muted">
                                Entry logged in real time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section id="features" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Key Features</h2>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body">
                                    <i className="fa fa-qrcode fa-3x text-primary mb-3"></i>
                                    <h5 className="card-title">QR-Based Tickets</h5>
                                    <p className="card-text">
                                        Every ticket has a unique and secure QR code.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body">
                                    <i className="fa fa-lock fa-3x text-success mb-3"></i>
                                    <h5 className="card-title">Secure Validation</h5>
                                    <p className="card-text">
                                        Prevents duplicate and fake ticket usage.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body">
                                    <i className="fa fa-clock fa-3x text-danger mb-3"></i>
                                    <h5 className="card-title">Real-Time Tracking</h5>
                                    <p className="card-text">
                                        Track entry and exit timestamps accurately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="py-5 bg-dark text-light text-center">
                <div className="container">
                    <h2 className="fw-bold mb-3">
                        Ready to Generate Your QR Ticket?
                    </h2>
                    <p className="mb-4">
                        Start using secure and contactless ticketing today.
                    </p>
                    <a href="/generate" className="btn btn-primary btn-lg">
                        Get Started
                    </a>
                </div>
            </section>
        </>
    );
};

export default Home;

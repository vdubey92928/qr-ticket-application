import Navbar from "./Navbar";
import Footer from "./Footer";

const BaseLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: "70px", minHeight: "100vh" }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default BaseLayout;

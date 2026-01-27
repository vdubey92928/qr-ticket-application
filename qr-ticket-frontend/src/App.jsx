import { BrowserRouter } from "react-router-dom"; // Import this!
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar"; // Uncomment if you use it here
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <AppRouter />
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
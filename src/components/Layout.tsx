
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-juwura-cream via-white to-juwura-beige/60">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {isHomePage && <Footer />}
    </div>
  );
};

export default Layout;

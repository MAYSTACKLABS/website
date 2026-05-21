import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";

import Home from "./pages/home/Home.tsx";
import Services from "./pages/services/services.tsx";
import Portfolio from "./pages/portfolio/portfolio.tsx";
import ProjectDetail from "./pages/portfolio/projectDetail.tsx";
import Contact from "./pages/contact/contact.tsx";
import About from "./pages/about/about.tsx";



export default function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
  );
}

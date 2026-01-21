import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import { useEffect } from "react";

function ScrollHome({ id }: { id: string }) {
  useEffect(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [id]);

  return <Home />;
}

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isAr = i18n.language.startsWith("ar");
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = isAr ? "ar" : "en";
  }, [i18n.language]);


  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<ScrollHome id="services" />} />
          <Route path="/work" element={<ScrollHome id="work" />} />
          <Route path="/why" element={<ScrollHome id="why" />} />
          <Route path="/contact" element={<ScrollHome id="contact" />} />
        </Routes>
      </Layout>
  );
}
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext.tsx";
import { Layout } from "../components/layout/Layout.tsx";
import Home from "../pages/home/Home.tsx";

const Services = lazy(() => import("../pages/services/services.tsx"));
const Portfolio = lazy(() => import("../pages/portfolio/portfolio.tsx"));
const ProjectDetail = lazy(() => import("../pages/portfolio/projectDetail.tsx"));
const Contact = lazy(() => import("../pages/contact/contact.tsx"));
const NotFound = lazy(() => import("../pages/not-found/NotFound.tsx"));

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Suspense>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

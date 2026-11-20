import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext.tsx";
import { Layout } from "../components/layout/Layout.tsx";
import Home from "../pages/home/Home.tsx";

const Services = lazy(() => import("../pages/services/Services.tsx"));
const Portfolio = lazy(() => import("../pages/portfolio/Portfolio.tsx"));
const Project = lazy(() => import("../pages/project/Project.tsx"));
const Contact = lazy(() => import("../pages/contact/Contact.tsx"));
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
                            <Route path="/portfolio/:slug" element={<Project />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

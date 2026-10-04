import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Home from "../pages/home/Home.tsx";

const Contact = lazy(() => import("../pages/contact/contact.tsx"));
const NotFound = lazy(() => import("../pages/not-found/NotFound.tsx"));
const Portfolio = lazy(() => import("../pages/portfolio/portfolio.tsx"));
const ProjectDetail = lazy(() => import("../pages/portfolio/projectDetail.tsx"));
const Services = lazy(() => import("../pages/services/services.tsx"));

export function AppRouter() {
    return (
        <Layout>
            <Suspense fallback={<div className="ms-route-loading" role="status" aria-label="Loading page" />}>
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
    );
}


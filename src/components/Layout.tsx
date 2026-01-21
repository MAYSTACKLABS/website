import Navbar from "./Navbar.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-shell">
            <Navbar />
            <main className="main-wrap">{children}</main>
        </div>
    );
}
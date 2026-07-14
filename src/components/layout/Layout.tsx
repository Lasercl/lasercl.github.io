import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-white">
      <div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-[120px] animate-pulse [animation-duration:8s]" />
        <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-[120px] animate-pulse [animation-duration:11s]" />
        <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] bg-secondary/30 rounded-full blur-[120px] animate-pulse [animation-duration:9s]" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
  return (
    <main className="bg-brand-black min-h-screen text-brand-light flex flex-col selection:bg-brand-light selection:text-brand-black">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl sm:text-9xl font-serif text-white tracking-tighter mb-4">404</h1>
        <p className="text-xs font-mono uppercase tracking-widest text-brand-grey mb-8">Page Not Found</p>
        <Link 
          to="/"
          className="px-6 py-3 rounded-full bg-white text-brand-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-light transition-all"
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}

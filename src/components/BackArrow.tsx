import { useNavigate } from "react-router-dom";

export default function BackArrow() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      data-cursor="back"
      className="fixed top-20 sm:top-24 left-4 sm:left-6 lg:left-12 z-30 hidden sm:flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-brand-black/75 backdrop-blur-xl hover:border-white/60 hover:bg-white/10 active:scale-90 transition-all duration-200 group shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 sm:w-5 sm:h-5 text-brand-light group-hover:-translate-x-0.5 transition-transform duration-300"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
  );
}
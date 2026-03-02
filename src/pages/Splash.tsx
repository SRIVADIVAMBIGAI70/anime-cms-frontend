/* ===== Splash Screen with CSS Animations ===== */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 800);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(() => navigate("/home"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <main
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="splash-orb splash-orb-1" />
        <div className="splash-orb splash-orb-2" />
        <div className="splash-orb splash-orb-3" />
      </div>

      {/* Logo */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-700 ${
          phase === "logo" ? "scale-90 opacity-0 splash-logo-enter" : ""
        }`}
        style={{ animation: "splash-logo-in 0.8s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        {/* Icon */}
        <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center splash-icon-glow">
          <span className="font-display font-bold text-primary-foreground text-4xl tracking-tight">IV</span>
        </div>

        {/* Title */}
        <div
          className={`text-center transition-all duration-500 ${
            phase === "logo" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold">
            <span className="gradient-text">Infinity</span>{" "}
            <span className="text-foreground">Void</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-lg tracking-widest uppercase splash-tagline">
            Enter the Void
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-border/30 rounded-full overflow-hidden mt-4">
          <div className="h-full gradient-primary splash-loading-bar" />
        </div>
      </div>
    </main>
  );
};

export default Splash;

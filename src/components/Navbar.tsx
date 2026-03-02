/* ===== Navbar Component ===== */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { checkAuth, logout } from "@/lib/auth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const authed = checkAuth();

  const links = [
    { to: "/home", label: "Home" },
    { to: "/admin", label: "Dashboard", auth: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center neon-glow transition-all duration-300 group-hover:neon-glow-strong">
            <span className="font-display font-bold text-primary-foreground text-sm">IV</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="gradient-text">Infinity</span>{" "}
            <span className="text-foreground">Void</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(
            (link) =>
              (!link.auth || authed) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive(link.to) ? "text-primary neon-text" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
          )}
          {authed ? (
            <button
              onClick={() => { logout(); window.location.href = "/home"; }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              <LogIn size={16} />
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-border/30 animate-fade-in">
          <div className="flex flex-col p-4 gap-3">
            {links.map(
              (link) =>
                (!link.auth || authed) && (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                      isActive(link.to)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
            )}
            {authed ? (
              <button
                onClick={() => { logout(); setMobileOpen(false); window.location.href = "/home"; }}
                className="text-sm text-left py-2 px-3 text-muted-foreground hover:text-destructive transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm py-2 px-3 text-primary hover:text-accent transition-colors"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

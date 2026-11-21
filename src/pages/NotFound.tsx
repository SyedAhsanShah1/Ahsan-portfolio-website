import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-24">
      <div className="text-center px-6" data-reveal>
        <h1 className="font-display text-7xl font-semibold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! This page doesn&apos;t exist - it may have been eaten by Chef Ahsan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gradient-primary text-primary-foreground rounded-full hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
          >
            Return to Home
          </Link>
          <Link
            to="/hidden-talent"
            className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-full font-medium hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            Or visit Chef Ahsan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

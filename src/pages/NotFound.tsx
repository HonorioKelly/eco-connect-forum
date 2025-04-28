
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando pode ter sido removida ou está temporariamente indisponível.
        </p>
        <Button asChild size="lg">
          <Link to="/">Voltar à Página Inicial</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;


import { Link } from "react-router-dom";
import { AirVent } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <AirVent className="h-5 w-5" />
          <p className="text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} EcoConnect. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Sobre nós
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Privacidade
          </Link>
          <Link
            to="/terms"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Termos
          </Link>
        </div>
      </div>
    </footer>
  );
}

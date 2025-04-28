
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  requireAuth?: boolean;
  children?: React.ReactNode;
}

export function Layout({ requireAuth, children }: LayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // If page requires authentication and user isn't authenticated
  if (requireAuth && !isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}


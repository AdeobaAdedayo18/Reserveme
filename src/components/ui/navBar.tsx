import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(href)}
      className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
    >
      {children}
    </div>
  );
}

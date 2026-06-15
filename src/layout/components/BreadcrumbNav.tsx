import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { appConfig } from "@/config/app";
import type { MenuItem } from "@/layout/Sidebar/types";

const normalizePath = (path: string) => {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
};

const pathMatches = (menuPath: string, pathname: string) => {
  const current = normalizePath(pathname);
  const target = normalizePath(menuPath);
  return current === target || current.startsWith(`${target}/`);
};

const findMenuTrail = (menus: MenuItem[], pathname: string): MenuItem[] => {
  let bestTrail: MenuItem[] = [];

  const walk = (items: MenuItem[], trail: MenuItem[]) => {
    for (const item of items) {
      const nextTrail = [...trail, item];

      if (pathMatches(item.path, pathname) && nextTrail.length >= bestTrail.length) {
        bestTrail = nextTrail;
      }

      if (item.children?.length) {
        walk(item.children, nextTrail);
      }
    }
  };

  walk(menus, []);
  return bestTrail;
};

const BreadcrumbNav: React.FC = () => {
  const { pathname } = useLocation();
  const menus = useUserStore((state) => state.menus);

  const trail = useMemo(() => {
    const menuTrail = menus ? findMenuTrail(menus, pathname) : [];

    if (menuTrail.length > 0) {
      return menuTrail;
    }

    if (normalizePath(pathname) === normalizePath(appConfig.defaultRoute)) {
      return [{ id: "dashboard", label: "Dashboard", path: appConfig.defaultRoute }];
    }

    return [];
  }, [menus, pathname]);

  if (trail.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-theme-border-secondary bg-theme-bg-base px-4 py-2">
      <nav className="flex min-h-6 items-center gap-1 text-sm text-theme-text-tertiary">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <React.Fragment key={String(item.id)}>
              {index > 0 && <ChevronRight size={14} className="text-theme-text-tertiary" />}
              {isLast ? (
                <span className="font-medium text-theme-text">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="transition-colors hover:text-theme-primary"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default BreadcrumbNav;

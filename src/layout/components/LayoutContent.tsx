import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const LayoutContent: React.FC = () => {
  const location = useLocation();

  return (
    <main className="p-3">
      <div key={location.pathname} className="app-page-transition">
        <Outlet />
      </div>
    </main>
  );
};

export default LayoutContent;

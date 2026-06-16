import React from "react";
import { Outlet } from "react-router-dom";

const LayoutContent: React.FC = () => {
  return (
    <main className="p-3">
      <Outlet />
    </main>
  );
};

export default LayoutContent;

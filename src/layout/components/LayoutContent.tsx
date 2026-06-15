import React from "react";
import { Outlet } from "react-router-dom";
import BreadcrumbNav from "./BreadcrumbNav";

const LayoutContent: React.FC = () => {
  return (
    <>
      <BreadcrumbNav />
      <main className="p-3">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutContent;

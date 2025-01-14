import React from "react";
import NavigationBarComponent from "../../components/NavigationBarComponent/NavigationBarComponent";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <div>
      <NavigationBarComponent />
      <Toaster />
      <Outlet />
    </div>
  );
};

export default MainLayout;

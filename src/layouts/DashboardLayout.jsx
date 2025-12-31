import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

export default function DashboardLayout() {
  return (
    <>
      <Sidebar />

      <div className="layout">
        <Outlet />
      </div>
    </>
  );
}

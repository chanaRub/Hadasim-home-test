import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import "../css/GroceryOwnerDashboard.css";

export default function GroceryOwnerDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <Sidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

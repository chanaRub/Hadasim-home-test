import { NavLink, useNavigate } from 'react-router-dom';
import "../css/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  // פונקציה לביצוע יציאה
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    sessionStorage.removeItem("token"); 
    

    // ניווט לדף הלוגין
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>מכולת השכונה</h2>
      <nav>
        <NavLink to="order-products" className="nav-link" activeClassName="active">
          מוצרים להזמנה
        </NavLink>
        <NavLink to="pending-orders" className="nav-link" activeClassName="active">
          הזמנות בתהליך
        </NavLink>
        <NavLink to="all-orders" className="nav-link" activeClassName="active">
          כל ההזמנות
        </NavLink>
      </nav>

      <button onClick={handleLogout} className="logout-button">
        יציאה
      </button>
    </div>
  );
}

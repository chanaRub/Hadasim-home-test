import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SupplierDashboard from './pages/SupplierDashboard';
import GroceryOwnerDashboard from './pages/GroceryOwnerDashboard';
import OrderProductsPage from './pages/OrderProductsPage';
import PendingOrdersPage from './pages/PendingOrdersPage';
import AllOrdersPage from './pages/AllOrdersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/supplier/:id" element={<SupplierDashboard />} />
        <Route path="/owner" element={<GroceryOwnerDashboard />}>
          <Route path="order-products" element={<OrderProductsPage />} />
          <Route path="pending-orders" element={<PendingOrdersPage />} />
          <Route path="all-orders" element={<AllOrdersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

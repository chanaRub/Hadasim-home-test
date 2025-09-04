import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SupplierDashboard() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [orders, setOrders] = useState([]); 
  const [clickedOrders, setClickedOrders] = useState({}); 

  useEffect(() => {
    axios.get(`http://localhost:5000/orders/${id}`)
      .then(response => {
        console.log("Received orders:", response.data);
        setOrders(response.data || []); 
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleStatusChange = (orderId, currentStatus) => {
    const newStatus = currentStatus === 'new' ? 'Pending' : currentStatus === 'Pending' ? 'Completed' : 'new';

    if (clickedOrders[orderId]) return;

    axios.put(`http://localhost:5000/orders/${orderId}/approve`)
      .then(response => {
        console.log(response.data);
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        
        setClickedOrders(prevState => ({
          ...prevState,
          [orderId]: true,
        }));
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login'); 
  };

  return (
    <div>
      <h2>ההזמנות שלך</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h3>הזמנה מספר {order.id} - {order.status}</h3>
              <h4>פרטי המוצרים:</h4>
              <ul className="list-disc pl-5 mb-2">
  {Array.isArray(order.products) && order.products.length > 0 ? (
    order.products.map((p, index) => (
      <li key={index}>
        {p.product.product_name} - כמות: {p.quantity}
      </li>
    ))
  ) : (
    <p>לא נמצאו מוצרים להזמנה זו</p>
  )}
</ul>

             
              {order.status === 'new' && !clickedOrders[order.id] && (
                <button 
                  onClick={() => handleStatusChange(order.id, order.status)}
                >
                  שינוי סטטוס
                </button>
              )}

              {order.status !== 'new' && <p>סטטוס: {order.status}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>אין הזמנות כרגע</p>
      )}

      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        יציאה
      </button>
    </div>
  );
}

export default SupplierDashboard;

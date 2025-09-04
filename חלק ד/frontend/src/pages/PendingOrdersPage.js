import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then(res => {
        console.log("orders",res.data); 
        const pending = res.data.filter(o => o.status === 'Pending');
        setOrders(pending);
      })
      .catch(() => alert("שגיאה בטעינת הזמנות"));
  }, []);

  const handleStatusChange = (orderId) => {
    axios.put(`http://localhost:5000/orders/${orderId}/approve`)
      .then(response => {
        console.log(response.data);
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: 'Completed' } : order
        ));
      })
      .catch(err => {
        console.error("Error changing status:", err);
        alert("שגיאה בשינוי סטטוס ההזמנה");
      });
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold text-yellow-800">הזמנות בתהליך</h2>
      {orders.map(o => (
        <div key={o.id} className="border p-4 mb-3 rounded">
          <p>הזמנה מספר {o.id}</p>
          <p>שם החברה: {o.company_name}</p>
          <p>שם נציג: {o.representative_name}</p>
          <p>טלפון: {o.phone_number}</p>
          <p>מוצרים:</p>
<ul className="list-disc pl-5 mb-2">
  {Array.isArray(o.products) && o.products.length > 0 ? (
    o.products.map((p, index) => (
      <li key={index}>
        {p.product.product_name} - כמות: {p.quantity}
      </li>
    ))
  ) : (
    <p>לא נמצאו מוצרים להזמנה זו</p>
  )}
</ul>

          <p>סטטוס: {o.status}</p>
          {/* כפתור לשינוי הסטטוס */}
          {o.status === 'Pending' && (
            <button
              onClick={() => handleStatusChange(o.id)}
              className="bg-green-500 text-white p-2 rounded"
            >
              שינוי ל-Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

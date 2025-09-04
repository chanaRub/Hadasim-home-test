import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then(res => setOrders(res.data))
      .catch(() => alert("שגיאה בטעינת הזמנות"));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold text-yellow-800">כל ההזמנות</h2>
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
        </div>
      ))}
    </div>
  );
}

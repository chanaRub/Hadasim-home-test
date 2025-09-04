import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/OrderProduct.css';

export default function OrderProductsPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/suppliers')
      .then(res => {
        console.log(res.data); // בדיקה
        setSuppliers(res.data);
      })
      .catch(() => alert("שגיאה בטעינת ספקים"));
  }, []);

  const addToCart = (supplierId, product, quantity) => {
    const quantityInt = parseInt(quantity, 10);  // המרה למספר שלם

    if (isNaN(quantityInt) || quantityInt < 1) {
      alert("הכמות לא תקינה");
      return;
    }

    if (quantityInt < product.min_quantity) {
      alert(`הכמות עבור המוצר ${product.product_name} לא יכולה להיות פחותה מהמינימום: ${product.min_quantity}`);
      return;
    }

    setCart(prev => {
      const updated = { ...prev };
      if (!updated[supplierId]) updated[supplierId] = [];

      const existingIndex = updated[supplierId].findIndex(p => p.product.product_name === product.product_name);
      if (existingIndex !== -1) {
        updated[supplierId][existingIndex].quantity = quantityInt;
      } else {
        updated[supplierId].push({ product, quantity: quantityInt });
      }

      return updated;
    });
  };

  const handleOrder = (supplierId) => {
    const products = cart[supplierId];
    if (!products || products.length === 0) return alert("לא נבחרו מוצרים להזמנה");

    axios.post('http://localhost:5000/orders', {
      supplier_id: supplierId,
      products: products,
      status: 'new'
    }).then(() => {
      alert("ההזמנה נשלחה");
      // איפוס ההזמנה רק לספק הזה
      setCart(prev => {
        const updated = { ...prev };
        delete updated[supplierId];
        return updated;
      });
    })
    .catch(() => alert("שגיאה בשליחה"));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold text-yellow-800">מוצרים להזמנה</h2>
      {suppliers.map(s => (
        <div key={s.id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-lg font-semibold">{s.company_name}</h3>
          <p>{s.representative_name} | {s.phone_number}</p>
          <ul className="mt-2">
            {s.goods.map(g => (
              <li key={g.product_name} className="flex flex-col mb-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{g.product_name}</span>
                  <span>ש"ח {g.price_per_item}</span>
                </div>
                <p>מינימום להזמנה: {g.min_quantity}</p>
                <input 
                  type="number" 
                  min="1" 
                  placeholder="כמות"
                  onBlur={(e) => addToCart(s.id, g, e.target.value)}
                  className="border p-1 w-24"
                />
              </li>
            ))}
          </ul>
          {cart[s.id] && cart[s.id].length > 0 && (
            <button
              onClick={() => handleOrder(s.id)}
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              בצע הזמנה
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

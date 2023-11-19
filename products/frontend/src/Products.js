import React, { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Created Time</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(products).map((key, index) => (
            <tr key={index}>
              <td>{products[key].id}</td>
              <td>{products[key].createdTime}</td>
              <td>{products[key].name}</td>
              <td>{products[key].price}</td>
              <td>{products[key].discount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

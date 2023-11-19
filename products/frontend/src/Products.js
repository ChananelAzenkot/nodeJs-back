import React, { useEffect, useState } from "react";
import moment from "moment";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Discount</th>
            <th>Price</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.discount}</td>
              <td>{product.price}</td>
              <td>{moment(product.createdTime).format("D/M/Y")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

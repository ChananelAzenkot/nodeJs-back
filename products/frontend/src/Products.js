import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";


export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);

    const remove = (id) => {
      if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
      }

      fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      }).then(() => {
        const newData = products.filter((x) => x.id !== id);
        setProducts(newData);
      });
    };

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
              <td>
                <Link to={`/product/${product.id}`}>
                  <button className="green">
                    <AiFillEdit />
                  </button>
                </Link>

                <button className="red" onClick={() => remove(product.id)}>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

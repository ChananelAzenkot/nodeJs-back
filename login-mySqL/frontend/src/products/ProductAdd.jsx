import { Link, useNavigate } from 'react-router-dom';
import './Product.css';
import { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';

export default function ProductNew() {
    const [item, setItem] = useState({
        name: '',
        price: 0,
        discount: 0,
    });
    const navigate = useNavigate();

    const handelInput = ev => {
        const { name, value } = ev.target;

        setItem({
            ...item,
            [name]: value,
        });
    }

    const save = ev => {
        ev.preventDefault();

        fetch(`http://localhost:4000/products`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(item),
        })
        .then(() => navigate('/products'));
    }

    return (
        <div className='ArticlesEdit'>
            <button className='returnLink'>
                <Link to="/products"><AiOutlineRight /> Back To The Products </Link>
            </button>

            {
                item &&
                <>
                    <h2>Add Product</h2>

                    <form onSubmit={save}>
                        <label>
                            Name:
                            <input type="text" name="name" value={item.name} onChange={handelInput} />
                        </label>

                        <label>
                            Price:
                            <input type="text" name="price" value={item.price} onChange={handelInput} />
                        </label>

                        <label>
                            Discount:
                            <input type="text" name="discount" value={item.discount} onChange={handelInput} />
                        </label>

                        <button>Add</button>
                    </form>
                </>
            }
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
    const [structure, setStructure] = useState([
        { name: 'amount', title: 'Quantity Of Products' },
        { name: 'avg', title: 'Average Prices' },
        { name: 'min', title: 'Minimum Price' },
        { name: 'max', title: 'Maximum Price' },
    ]);

    useEffect(() => {
        const url = 'http://localhost:4000/dashboard';
        const params = {
          credentials: "include",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.token,
          },
        };

        Promise.all([
            fetch(`${url}/products/amount`, params).then(res => res.text()),
            fetch(`${url}/products/avg`, params).then(res => res.text()),
            fetch(`${url}/products/min`, params).then(res => res.text()),
            fetch(`${url}/products/max`, params).then(res => res.text()),
        ])
        .then(data => {
            structure.forEach((item, i) => item.value = Math.round(data[i] * 10) / 10);
            setStructure([...structure]);
        });
    }, [])

    return (
        <div className='Dashboard'>
            {
                structure.map(s => 
                    <div key={s.name} className='card'>
                        <header>{s.title}</header>
                        <div>{s.value}</div>
                    </div>    
                )
            }
        </div>
    )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from './Nav';


export const Machinery_Order = () => {

  const [result, getresult] = useState([])
  useEffect(() => {
    loaddata();
  }, []);
  function loaddata() {
    axios({
      method: 'post',
      url: '/view_machinery_order',
      data:{"ofid":sessionStorage.getItem('oid')}
    })
      .then((response) => {
        const res = response.data;
        getresult(res.data || []);
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    }

  return (
    <div>
      <NavBar></NavBar>
      <div style={{
      backgroundColor: '#f8f8e8',
      padding: '20px',
      minHeight: '100vh',
      marginTop: "50px",
     
    }}>
      <h2 className="text-center mb-4" style={{ color: '#9ABD6A',fontWeight:"bold" }}>MACHINERY ORDER</h2>
      <div style=
      {{ display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      }}>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
      <tr  style={{
              backgroundColor: '#9ABD6A',
              color: 'white',
              textAlign: 'left',
            }}>
        <th style={{ padding: '10px' }}>No</th>
        <th style={{ padding: '10px' }}>Farmer_name</th>
        <th style={{ padding: '10px' }}>Amount</th>
        <th style={{ padding: '10px' }}>Order_date</th>
        <th style={{ padding: '10px' }}>payment_status</th>
        <th style={{ padding: '10px' }}>shiping_address</th>
        <th style={{ padding: '10px' }}>View More</th>

        

        

      </tr>
      {result.map((s, index) => (
  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f8e9' : '#ffffff' }}>
    <td style={{ padding: '10px' }}>{index + 1}</td>
    <td style={{ padding: '10px' }}>
      {s.ORDER_id && s.ORDER_id.FARMER_id ? s.ORDER_id.FARMER_id.name : "N/A"}
    </td>
    <td style={{ padding: '10px' }}>
      {s.ORDER_id ? s.ORDER_id.amount : "N/A"}
    </td>
    <td style={{ padding: '10px' }}>
      {s.ORDER_id ? s.ORDER_id.date : "N/A"}
    </td>
    <td style={{ padding: '10px' }}>
      {s.ORDER_id ? s.ORDER_id.payment_status : "N/A"}
    </td>  
    <td style={{ padding: '10px' }}>
      {s.ORDER_id ? s.ORDER_id.shipping_address : "N/A"}
    </td>
    <td style={{ padding: '10px' }}>
      {s.ORDER_id ? (
        <button
          style={{
            backgroundColor: '#28A745',
            color: 'white',
            padding: '5px 15px',
            marginRight: '5px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <a
            href={`/Farm_officer_Machinery_order_details/${s.ORDER_id._id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            View
          </a>
        </button>
      ) : (
        "N/A"
      )}
    </td>
  </tr>
))}

    </table>
      </div>
    </div>
    </div>
  )
}


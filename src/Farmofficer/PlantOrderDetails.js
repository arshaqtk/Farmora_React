import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavBar } from './Nav';

export const Plant_order_details = () => {
  
  const [result, getresult] = useState([])
  const{id}=useParams()
  useEffect(() => {
    loaddata();
  }, []);
  function loaddata() {
    axios({
      method: 'post',
      url: '/view_plant_order_details',
      data:{"oid":id}
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
    <div><NavBar></NavBar>
    <div style={{
      backgroundColor: '#f8f8e8',
      padding: '20px',
      minHeight: '100vh',
      marginTop: "50px",
    }}>
      <h2 className="text-center mb-4" style={{ color: '#9ABD6A',fontWeight:"bold" }}>PLANT ORDER DETAILS</h2>
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
        <th style={{ padding: '10px' }}>Plant_name</th>
        <th style={{ padding: '10px' }}>date </th>
        <th style={{ padding: '10px' }}>Quantity</th>
        <th style={{ padding: '10px' }}>total_price</th>
        
      </tr>
      {result.map((s, index) => (
           <tr key={index}style={{
            backgroundColor: index % 2 === 0 ?  '#f1f8e9' : '#ffffff',
          }}>
            <td style={{ padding: '10px' }}>{index + 1}</td>
            <td style={{ padding: '10px' }}>{s.PLANT_id.name}</td>
            <td style={{ padding: '10px' }}>{s.date}</td>
            <td style={{ padding: '10px' }}>{s.quantity}</td>
            <td style={{ padding: '10px' }}>{s.total_amount}</td>      
           
          </tr>)    
        )}
    </table></div></div>
  )
}


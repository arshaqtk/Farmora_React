import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from './Nav';

export const View_Notification = () => {
  const [result, getresult] = useState([])
  useEffect(() => {
    loaddata();
  }, []);
  function loaddata() {
    axios({
      method: 'post',
      url: '/Officer_view_public_notification',
      data:{"ofid":sessionStorage.getItem("oid")}
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
    marginTop: "60px",
  }}>
    <h2 className="text-center mb-4" style={{ color: '#9ABD6A',fontWeight:"bold" }}>PUBLIC NOTIFICATIONS</h2>
  <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#28A745',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <thead>
    <tr  style={{
            backgroundColor: '#9ABD6A',
            color: 'white',
            textAlign: 'left',
          }}>
        <th style={{ padding: '10px'}}>NO</th>
        <th style={{ padding: '10px'}}>Title</th>
        <th style={{ padding: '10px'}}>Description</th>
        <th style={{ padding: '10px'}}>Date</th>    
          </tr>
          </thead>
          {result.map((s, index) => (
         <tr key={index}style={{
          backgroundColor: index % 2 === 0 ?  '#f1f8e9' : '#ffffff',
        }}>
          <td style={{ padding: '10px' }}>{index + 1}</td>
         
          <td style={{ padding: '10px' }}>{s.title}</td>
          <td style={{ padding: '10px' }}>{s.description}</td>
         <td style={{ padding: '10px' }}>{s.date}</td>      
   
        </tr>)    
      )} 
    </table>
  </div></div>
    
  )
}


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from './Nav';

export const Doubts = () => {
  const [result, getresult] = useState([])
  useEffect(() => {
    loaddata();
  }, []);
  function loaddata() {
    axios({
      method: 'post',
      url: '/view_doubts',
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
    marginTop: "50px",
  }}>
    <h2 className="text-center mb-4" style={{ color: '#9ABD6A',fontWeight:"bold" }}>FARMER DOUBTS</h2>
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
        <th style={{ padding: '10px'}}>Farmer name</th>
        <th style={{ padding: '10px'}}>Question</th>
        <th style={{ padding: '10px'}}>Description</th>
        <th style={{ padding: '10px'}}>Reply </th>
        <th style={{ padding: '10px'}}>Response</th>    
          </tr>
          </thead>
          {result.map((s, index) => (
         <tr key={index}style={{
          backgroundColor: index % 2 === 0 ?  '#f1f8e9' : '#ffffff',
        }}>
          <td style={{ padding: '10px' }}>{index + 1}</td>
          <td style={{ padding: '10px' }}>{s.FARMER_id.name}</td>
          <td style={{ padding: '10px' }}>{s.question}</td>
          <td style={{ padding: '10px' }}>{s.description}</td>
         <td style={{ padding: '10px' }}>{s.reply}</td>      
         <td style={{ padding: '10px' }}> <button style={{
                            backgroundColor: '#28A745',
                            color: 'white',
                            padding: '5px 15px',
                            marginRight: '5px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                          }}><a href={`/Farm_officer_Send_doubt_reply/${s._id}`} style={{textDecoration:"none", color:"white"}}>Send</a></button></td>
   
        </tr>)    
      )} 
    </table>
  </div>//response need to confirm is it correct or should add an button</div>
    
  )
}


import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const Feedback_rating = () => {
  const [result, getresult] = useState([])
  useEffect(() => {
    loaddata();
  }, []);
  function loaddata() {
    axios({
      method: 'post',
      url: '/view_plant_feedback',
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
    <h1 align="center">FEEDBACK & RATING </h1>
    <table width="924" border="1">
      <tr>
      <td width="97">No</td>
        <td>Plant_name</td>
        <td>Farmer_name</td>
        <td>Rating</td>
        <td>Feedback</td>
        <td>Date</td>

      </tr>
      {result.map((s, index) => (
           <tr key={index}>
            <td>{index + 1}</td>
            <td>{s.PLANT_id.name}</td>
            <td>{s.FARMER_id.name}</td>
            <td>{s.rating}</td>
            <td>{s.feedback}</td>      
            <td>{s.date}</td>
          </tr>)    
        )}
     </table>
</div>
  )
}


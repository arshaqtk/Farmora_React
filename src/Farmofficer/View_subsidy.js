import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { NavBar } from './Nav';



export const View_subsidy = () => {
  const [result, getresult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios({
      method: 'post',
      url: '/view_subsidy',
    })
      .then((response) => {
        const res = response.data;
        getresult(res.data || []);
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }

  return (
   <div> 
    <NavBar></NavBar>
    <div style={{ backgroundColor: '#f8f8e8', padding: '20px', minHeight: '100vh',marginTop: "50px" }}>
   <h2 className="text-center mb-4" style={{ color: '#9ABD6A', fontWeight: "bold" }}>SUBSIDY DETAILS</h2>
   <table style={{
     width: '100%',
     borderCollapse: 'collapse',
     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
     borderRadius: '8px',
     overflow: 'hidden',
   }}>
     <thead>
       <tr style={{ backgroundColor: '#9ABD6A', color: 'white', textAlign: 'left' }}>
         <th style={{ padding: '10px' }}>No</th>
         <th style={{ padding: '10px' }}>Farmer Name</th>
         <th style={{ padding: '10px' }}>Gender</th>
         <th style={{ padding: '10px' }}>Mobile No</th>
         <th style={{ padding: '10px' }}>Email</th>
         <th style={{ padding: '10px' }}>Panjayath</th>
         <th style={{ padding: '10px' }}>Post</th>
         <th style={{ padding: '10px' }}>Pin</th>
         <th style={{ padding: '10px' }}>AdharNO</th>
         <th style={{ padding: '10px' }}>Dob</th>
         <th style={{ padding: '10px' }}>Farmer Category</th>
         <th style={{ padding: '10px' }}>Farmer Type</th>
         <th style={{ padding: '10px' }}>Machinery Name</th>
         <th style={{ padding: '10px' }}>Farmer image</th>
         <th style={{ padding: '10px' }}>land reciept</th>


         <th style={{ padding: '10px' }}>Bank Details</th>
       </tr>
     </thead>
     <tbody>
       {result.map((s, index) => (
         <tr key={index} style={{
           backgroundColor: index % 2 === 0 ? '#f1f8e9' : '#ffffff',
         }}>
           <td style={{ padding: '10px' }}>{index + 1}</td>
           <td style={{ padding: '10px' }}>{s.name}</td>
           <td style={{ padding: '10px' }}>{s.gender}</td>
           <td style={{ padding: '10px' }}>{s.phone}</td>
           <td style={{ padding: '10px' }}>{s.email}</td>
           <td style={{ padding: '10px' }}>{s.place}</td>
           <td style={{ padding: '10px' }}>{s.post}</td>
           <td style={{ padding: '10px' }}>{s.pin}</td>
           <td style={{ padding: '10px' }}>{s.adharno}</td>
           <td style={{ padding: '10px' }}>{s.dob}</td>
           <td style={{ padding: '10px' }}>{s.farmcategory}</td>
           <td style={{ padding: '10px' }}>{s.farmtype}</td>
           <td style={{ padding: '10px' }}>{s.MACHINERY_id.name}</td>
           <td style={{ padding: '10px' }}>
           <img
             alt="farmer"
             style={{
               height: "70px",
               width: "70px",
               borderRadius: "5px",
               border: "2px solid #0078D7",
               cursor: "pointer", // Add pointer cursor to indicate it's clickable
             }}
             src={s.image}
             onClick={() =>
               Swal.fire({
                 title: "Farmer Image",
                 imageUrl: s.image,
                 imageAlt: "Farmer Image",
                 imageWidth: "80%", // Set width for a better full-screen experience
                 imageHeight: "auto",
                 showCloseButton: true,
                 showConfirmButton: false,
                 background: "#fff",
               })
             }
           /></td>
           <td style={{ padding: '10px' }}>
           <img
             alt="Land Reciept"
             style={{
               height: "70px",
               width: "70px",
               borderRadius: "5px",
               border: "2px solid #0078D7",
               cursor: "pointer", // Add pointer cursor to indicate it's clickable
             }}
             src={s.lrimage}
             onClick={() =>
               Swal.fire({
                 title: "Land Reciept Image",
                 imageUrl: s.lrimage,
                 imageAlt: "Land Reciept Image",
                 imageWidth: "80%", // Set width for a better full-screen experience
                 imageHeight: "auto",
                 showCloseButton: true,
                 showConfirmButton: false,
                 background: "#fff",
               })
             }
           /></td>


           <td style={{ padding: '10px' }}>
             <a href={`/Farm_officer_View_subsidy_bank_details/${s._id}`} style={{ color: '#007BFF', textDecoration: 'none' }}>View</a>
           </td>
          
         </tr>
       ))}
     </tbody>
   </table>
 </div></div>
  );
};

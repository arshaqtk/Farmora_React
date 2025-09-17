import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { NavBar } from './Nav';

export const Officer_View_farmer = () => {
  const [result, getResult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios({
      method: 'post',
      url: '/officer_view_farmers',
      data: { place: sessionStorage.getItem('off_place') },
    })
      .then((response) => {
        const res = response.data;
        getResult(res.data || []);
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
  <div
    style={{
      backgroundColor: "#f8f8e8",
      padding: "20px",
      minHeight: "100vh",
      marginTop: "50px", // Added margin to prevent overlap
    }}
  >
    <h2
      className="text-center mb-4"
      style={{ color: "#9ABD6A", fontWeight: "bold" }}
    >
      FARMER DETAILS
    </h2>

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#28A745",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: "#9ABD6A",
            color: "white",
            textAlign: "left",
          }}
        >
          <th style={{ padding: "10px" }}>NO</th>
          <th style={{ padding: "10px" }}>Name</th>
          <th style={{ padding: "10px" }}>Gender</th>
          <th style={{ padding: "10px" }}>Phone</th>
          <th style={{ padding: "10px" }}>Email</th>
          <th style={{ padding: "10px" }}>Place</th>
          <th style={{ padding: "10px" }}>Post</th>
          <th style={{ padding: "10px" }}>PIN</th>
          <th style={{ padding: "10px" }}>Aadhar No</th>
          <th style={{ padding: "10px" }}>Image</th>
          <th style={{ padding: "10px" }}>Send Notification</th>
        </tr>
      </thead>
      <tbody>
        {result.map((s, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "#f1f8e9" : "#ffffff",
            }}
          >
            <td style={{ padding: "10px" }}>{index + 1}</td>
            <td style={{ padding: "10px" }}>{s.name}</td>
            <td style={{ padding: "10px" }}>{s.gender}</td>
            <td style={{ padding: "10px" }}>{s.phone}</td>
            <td style={{ padding: "10px" }}>{s.LOGIN_id.username}</td>
            <td style={{ padding: "10px" }}>{s.place}</td>
            <td style={{ padding: "10px" }}>{s.post}</td>
            <td style={{ padding: "10px" }}>{s.pin}</td>
            <td style={{ padding: "10px" }}>{s.adharno}</td>
            <td style={{ padding: "10px" }}>
              <img
                alt="Farmer Image"
                style={{
                  height: "70px",
                  width: "70px",
                  borderRadius: "5px",
                  border: "2px solid #0078D7",
                  cursor: "pointer",
                }}
                src={s.image}
                onClick={() =>
                  Swal.fire({
                    title: "Farmer Image",
                    imageUrl: s.image,
                    imageAlt: "Farmer Image",
                    imageWidth: "80%",
                    imageHeight: "auto",
                    showCloseButton: true,
                    showConfirmButton: false,
                    background: "#fff",
                  })
                }
              />
            </td>
            <td style={{ padding: "10px",textAlign: "center"}}>
              <button
                style={{
                  backgroundColor: "#28A745",
                  color: "white",
                  padding: "5px 15px",
                  marginRight: "5px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <a
                  href={`/Farm_officer_Send_notification/${s._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Send
                </a>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { NavBar } from './Nav';

export const View_plants = () => {
  const [result, getresult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios
      .post("/view_plants", { ofid: sessionStorage.getItem("oid") })
      .then((response) => {
        getresult(response.data.data || []);
      })
      .catch((error) => console.log(error.response || error));
  }

  function delete_plant(plantid) {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC3545",
      cancelButtonColor: "#28A745",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/Officer_delete_plant", { plant_id: plantid })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Plant has been removed successfully.",
              icon: "success",
              confirmButtonColor: "#28A745",
            });
            loaddata(); // Reload data after deletion
          })
          .catch((error) => console.log(error.response || error));
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
          marginTop: "70px",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#9ABD6A", fontWeight: "bold" }}
        >
          PLANT DETAILS
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
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
              <th style={{ padding: "10px", textAlign: "center" }}>No</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Category</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Price</th>
              <th style={{ padding: "10px", textAlign: "center" }}>
                Description
              </th>
              <th style={{ padding: "10px", textAlign: "center" }}>Quantity</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Image</th>
              <th style={{ padding: "10px", textAlign: "center" }}>
                Edit/Delete
              </th>
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
                <td style={{ padding: "10px" }}>{s.category}</td>
                <td style={{ padding: "10px" }}>{s.price}</td>
                <td style={{ padding: "10px" }}>{s.description}</td>
                <td style={{ padding: "10px" }}>{s.quantity}</td>
                <td>
                  <img
                    alt="Plant Image"
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
                        title: "Plant Image",
                        imageUrl: s.image,
                        imageAlt: "Plant Image",
                        imageWidth: "80%", // Set width for a better full-screen experience
                        imageHeight: "auto",
                        showCloseButton: true,
                        showConfirmButton: false,
                        background: "#fff",
                      })
                    }
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  <div className="d-flex gap-2">
                    <button
                      style={{
                        backgroundColor: "#DC3545",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => delete_plant(s._id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{
                        backgroundColor: "#28A745",
                        color: "white",
                        padding: "5px 15px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <a
                        href={`/Farm_officer_Update_plants/${s._id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Edit
                      </a>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="8" style={{ padding: 10, textAlign: "center" }}>
                <button
                  style={{
                    backgroundColor: "#28A745",
                    color: "white",
                    padding: "7px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <a
                    href="/Farm_officer_Add_plants"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    ADD
                  </a>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div></div>

  );
};

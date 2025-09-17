import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { NavBar } from './Nav';

export const View_subsidy_bankdetails = () => {
  const { id } = useParams();
  const [result, getresult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios({
      method: "post",
      url: "/view_subsidy_bank_details",
      data: { sid: id },
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

  function handleAction(subsidyid, action) {
    Swal.fire({
      title: action === "approve" ? "Approve Application?" : "Reject Application?",
      text: `Are you sure you want to ${action} this application?`,
      icon: action === "approve" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#28a745" : "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: action === "approve" ? "Yes, Approve it!" : "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url =
          action === "approve"
            ? "/Officer_Approve_subsidy_application"
            : "/Officer_Reject_subsidy_application";

        axios
          .post(url, { subsidyid })
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: `Application has been ${action}d successfully.`,
              icon: "success",
              confirmButtonColor: "#28a745",
            });
            loaddata();
          })
          .catch((error) => console.log(error.response || error));
      }
    });
  }

  return (
    <div>
      <NavBar></NavBar>
      <div
    style={{ backgroundColor: "#f8f8e8", padding: "20px", minHeight: "100vh",marginTop: "50px", }}
  >
    <h2
      className="text-center mb-4"
      style={{ color: "#9ABD6A", fontWeight: "bold" }}
    >
      SUBSIDY BANK DETAILS
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
        <tr style={{ backgroundColor: "#9ABD6A", color: "white", textAlign: "left" }}>
          <th style={{ padding: "10px" }}>No</th>
          <th style={{ padding: "10px" }}>Name</th>
          <th style={{ padding: "10px" }}>Account No</th>
          <th style={{ padding: "10px" }}>Bank Name</th>
          <th style={{ padding: "10px" }}>IFSC Code</th>
          <th style={{ padding: "10px" }}>Passbook Image</th>
          <th style={{ padding: "10px" }}>Machinery Amount</th>
          <th style={{ padding: "10px" }}>Subsidy Amount</th>
          <th style={{ padding: "10px" }}>Status</th>
          <th style={{ padding: "10px" }}>Approve/Reject</th>
        </tr>
      </thead>
      <tbody>
        {result.map((s, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f1f8e9" : "#ffffff" }}>
            <td style={{ padding: "10px" }}>{index + 1}</td>
            <td style={{ padding: "10px" }}>{s.accname}</td>
            <td style={{ padding: "10px" }}>{s.accountno}</td>
            <td style={{ padding: "10px" }}>{s.bankname}</td>
            <td style={{ padding: "10px" }}>{s.ifsccode}</td>
            <td style={{ padding: "10px" }}>
              <img
                alt="farmer"
                style={{
                  height: "70px",
                  width: "70px",
                  borderRadius: "5px",
                  border: "2px solid #0078D7",
                  cursor: "pointer", // Add pointer cursor to indicate it's clickable
                }}
                src={s.passbookimage}
                onClick={() =>
                  Swal.fire({
                    title: "Passbook Image",
                    imageUrl: s.passbookimage,
                    imageAlt: "Passbook Image",
                    imageWidth: "80%", // Set width for a better full-screen experience
                    imageHeight: "auto",
                    showCloseButton: true,
                    showConfirmButton: false,
                    background: "#fff",
                  })
                }
              />
            </td>

            <td style={{ padding: "10px" }}>{s.ORDER_DETAILS_id?.total_amount}</td>
            <td style={{ padding: "10px" }}>{s.subsidyamount}</td>
            <td style={{ padding: "10px" }}>{s.applicationstatus}</td>
            <td style={{ padding: "10px" }}>
              <div className="d-flex gap-2">
                <button
                  style={{
                    backgroundColor: "#28A745",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAction(s._id, "approve")}
                >
                  Approve
                </button>
                <button
                  style={{
                    backgroundColor: "#DC3545",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAction(s._id, "reject")}
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div></div>
  );
};

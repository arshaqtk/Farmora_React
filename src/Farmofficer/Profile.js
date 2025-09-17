import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Officer_profile = () => {
  const [result, getresult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios({
      method: 'post',
      url: '/officer_view_profile',
      data: { "lid": sessionStorage.getItem("lid") }}
    )
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
    <div style={{ backgroundColor: '#f8f8e8', padding: '20px', minHeight: '100vh' }}>
      <h2 className="text-center mb-4" style={{ color: '#4CAF50', fontWeight: "bold" }}>Account</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {result.map((s, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              padding: '20px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            {/* Profile Image */}
            <div style={{ marginBottom: '15px' }}>
              <img
                src={s.image} // Assuming `s.image` contains the image URL
                alt="Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #4CAF50',
                }}
              />
            </div>

            {/* Profile Details */}
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: '5px 0', color: '#333' }}>
                <strong>Position:</strong> {s.position}
              </p>
              <p style={{ margin: '5px 0', color: '#333' }}>
                <strong>Phone:</strong> {s.phone}
              </p>
              <p style={{ margin: '5px 0', color: '#333' }}>
                <strong>Gender:</strong> {s.gender}
              </p>
              <p style={{ margin: '5px 0', color: '#333' }}>
                <strong>Email:</strong> {s.email}
              </p>
              <p style={{ margin: '5px 0', color: '#333' }}>
                <strong>Place:</strong> {s.place}
              </p>
              <p style={{ margin: '5px 0', color: '#333' }}>
                <strong>Post:</strong> {s.post}
              </p>
              <p style={{ margin: '5px 0', color: '#333' }}>
                <strong>Pin:</strong> {s.pin}
              </p>
            </div>
            <button style={{
                              backgroundColor: '#28A745',
                              color: 'white',
                              padding: '5px 15px',
                              marginRight: '5px',
                              borderRadius: '5px',
                              border: 'none',
                              cursor: 'pointer',
                            }}>
                              <a href={`/Farm_officer_update_profile/${s._id}`} 
                              style={{textDecoration:"none", color:"white"}}>Update</a>
                      </button>
          </div>
        ))}
        
      </div>
    </div>
  );
};

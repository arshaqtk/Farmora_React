import React, { useState } from 'react';
import axios from 'axios';

const Forgotpassword = () => {
    
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/sendemail', { email });
      setMessage('Email sent successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send email. Please try again.');
    }
  };
// 



  // const {
  //   register,
  //   handleSubmit,
  
  //   formState: { errors },
   
  // } = useForm();
  
  const onSub =(data) =>{
    data.qual=data.qual.join(', ')
   console.log(data)
   formsub(data)
  }
  function formsub(data)
  {

    axios({
      method: 'post',
      url: '/sendemail',
     
      
      data:data
     
     })
      .then((response) => {
          console.log(response)
        
        const res = response.data;
        console.log(res.status)
        alert(res.message)
        if(res.status)
          {
              console.log("qwertyu")
     window.location='/Advocatehome';
          }
       
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
    <>
    
<div className="container mt-5">
      <div className="card">
        <div className="card-header text-center text-white" style={{ backgroundColor: '#4CAF50' }}>
          <h3>Forgot Password</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Enter your email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn text-white mt-3" style={{ backgroundColor: '#4CAF50' }}>
              Send Email
            </button>
          </form>
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    </div>
   
    
    </>
  )
}

export default Forgotpassword
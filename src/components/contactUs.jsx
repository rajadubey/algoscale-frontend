
import React from "react";
import axios from "axios";
import "./style.css";

export default function ContactUs(props) {
  const user = props.user;
  const [enquiry, setEnquiry] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (field, value) => {
    if (field === "firstName") {
      setEnquiry({ ...enquiry, firstName: value });
    } else if (field === "lastName") {
      setEnquiry({ ...enquiry, lastName: value });
    } else if (field === "email") {
      setEnquiry({ ...enquiry, email: value });
    } else if (field === "message") {
      setEnquiry({ ...enquiry, message: value });
    }
  };

  const validateEmail = (email) =>{
      return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }

  const validateData = () => {
    return (
      enquiry.firstName.length > 1 &&
      enquiry.lastName.length > 1 &&
      enquiry.message.length >= 20 &&
      validateEmail(enquiry.email)
    );
  };

  const submitForm = () => {
    if (!validateData()) return;

    axios
      .post("http://localhost:5000/submitForm", ({
          name: enquiry.firstName+' '+enquiry.lastName,
          email: enquiry.email,
          message: enquiry.message
      }))
      .then(() => {
          console.log('Submitted');
          setTimeout(()=>props.history.replace("/analytics"),2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="contact-us-container">
      <h1>{"Contact Us Form"}</h1>
      <div>
        <label>First Name</label>
        <input
          type={"text"}
          value={enquiry.firstName}
          onChange={(event) => handleChange("firstName", event.target.value)}
        />
        <label>Last Name</label>
        <input
          type={"text"}
          value={enquiry.lastName}
          onChange={(event) => handleChange("lastName", event.target.value)}
        />
        <label>Email</label>
        <input
          type={"email"}
          value={user.email || enquiry.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
        <label>Message</label>
        <textarea
          id={"message"}
          value={enquiry.message}
          onChange={(event) => handleChange("message", event.target.value)}
        />
        <pre>(Min 20 Characters) {enquiry.message.length + "/" + 20}</pre>
      </div>
      <button onClick={submitForm}>SUBMIT</button>
    </div>
  );
}

import React, { useState } from "react";
import "../styles/contact.css";
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", form);
    alert("Message submitted successfully!");
    setForm({ name: "", email: "", message: "" });
    navigate('/');
  };

  return (
    <div className="contact-root">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Have any questions or feedback? We'd love to hear from you!</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

import "./Mailer.css";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import Modal from "react-modal";

const Mailer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_z3e974q",
        "template_k7bigqi",
        e.target,
        "user_roeGWR7CzZoi7UV22hQAW"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }

  return (
    <div className='mail-wrapper'>
      
      <div className="mail-wrapper">
        <form className="form-wrapper" onSubmit={sendEmail}>
          <div className="name-email-wrapper">
            <label className="name-label">Name:</label>
            <input classname="name-text" type="text" name="name" />

            <label className="email-label">Email:</label>
            <input
              classname="email-text"
              type="email"
              name="user_email"
              size=""
            />
          </div>
          <label className="form-label">Message</label>
          <textarea classname="mail-body" name="message" rows="10" />
          <input
            classname="message-text"
            type="submit"
            value="Send"
            onClick={() => setIsModalOpen(true)}
          />
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="mail-sent"
            closeTimeoutMS={200}
          >
            Mail sent successfully!!
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default Mailer;

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
    <div className="mail-wrapper">
      <div className="mail-wrapper">
        <form className="form-wrapper" onSubmit={sendEmail}>
          <div className="name-email-wrapper">
            {/* <label className="name-label">Name:</label>
            <input classname="name-text" type="text" name="name" />

            <label className="email-label">Email:</label>
            <input
              classname="email-text"
              type="email"
              name="user_email"
              size=""
            /> */}

            <label
              for="input-group-1"
              className="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                name="user_email"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@xxxx.com"
              />
            </div>
            <label
              for="website-admin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                @
              </span>
              <input
                type="text"
                name="name"
                id="website-admin"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kyochul"
              />
            </div>
          </div>

          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <br />
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Feel free to contact me!"
          ></textarea>

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

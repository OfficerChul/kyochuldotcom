import React, { useState } from "react";
import "./Contact.css";
import Modal from "react-modal";

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(0);

    return (
        <div className="footer-container">
            <div className="wave-content">
                <h2 className='wave-title'>More About Me?</h2>
                <h2 className='wave-title1'>More About Me?</h2>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="social-icons">
                        <ul className="social-icon">
                            <li className="social-icon">
                                <a
                                    href="mailto:jang128@purdue.edu"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mail"
                                >
                                    <i classname="email" class="far fa-envelope"></i>
                                </a>
                            </li>
                            <li className="social-icon">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100003819070404"
                                    className="facebook"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i class="fab fa-facebook" />
                                </a>
                            </li>
                            <li className="social-icon">
                                <a
                                    href="https://www.instagram.com/kjang_hochul/"
                                    className="instagram"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i class="fab fa-instagram" />
                                </a>
                            </li>
                            <li className="social-icon">
                                <a
                                    href="https://www.linkedin.com/in/kyochul-jang-93b263208/"
                                    className="linked-in"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i class="fab fa-linkedin"></i>
                                </a>
                            </li>
                            <li className="social-icon">
                                <a
                                    href="https://github.com/OfficerChul"
                                    className="github"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <small className="website-rights">KCJ © 2022</small>
                </div>
            </section>
        </div>
    );
}

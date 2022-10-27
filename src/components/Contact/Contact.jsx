import React from "react";
import "./Contact.css";
import Mailer from '../Mailer/Mailer'

export default function Contact() {

    return (
        <div className="footer-container">
            {/* <div className="contact-wrapper">
            <div className="wave-content">
                <h2 className='wave-title'>More About Me?</h2>
                <h2 className='wave-title1'>More About Me?</h2>
                </div>
                </div> */}
            <div className="wave-content">
                <h2 className='wave-title'>Contact!</h2>
                <h2 className='wave-title1'>Contact!</h2>
                </div>
            <Mailer />
            <div className='last'>
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
                    {/* <hr className='mid-line'/> */}
                    

                </div>
            </section>
            <hr className='mid-line' />
            <div className="website-rights">KCJ © 2022</div>
            </div>
        </div>
    );
}

import React from "react";
import "./Contact.css";
import Mailer from '../Mailer/Mailer';
import Banner from './banner.png';

export default function Contact() {

    return (
        <div className="footer-container">
            <div className="wave-content project-title" style={{ marginTop: '20px' }}>
                <h2 id='wave-title'>Contact</h2>

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
                                        <i  className="email far fa-envelope"></i>
                                    </a>
                                </li>
                                <li className="social-icon">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=100003819070404"
                                        className="facebook"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-facebook" />
                                    </a>
                                </li>
                                <li className="social-icon">
                                    <a
                                        href="https://www.instagram.com/kjang_hochul/"
                                        className="instagram"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-instagram" />
                                    </a>
                                </li>
                                <li className="social-icon">
                                    <a
                                        href="https://www.linkedin.com/in/kyochul-jang-93b263208/"
                                        className="linked-in"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </li>
                                <li className="social-icon">
                                    <a
                                        href="https://github.com/OfficerChul"
                                        className="github"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="fab fa-github"></i>
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



            <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://kyochuljang.com/" className="flex items-center">
                            <img src={Banner} className="mr-3 h-14" alt="FlowBite Logo" />

                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="naver.com" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="naver.com" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-lg text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://kyochuljang.com/" className="hover:underline">OfficerChul™</a>. All Rights Reserved.
                    </span>
                    <div className="flex space-x-6 sm:justify-center sm:mt-0 text-2xl">
                        <li className="social-icon">
                            <a
                                href="mailto:jang128@purdue.edu"
                                target="_blank"
                                rel="noreferrer"
                                className="mail"
                                
                            >
                                <i className="email far fa-envelope"></i>
                            </a>
                        </li>
                        <li className="social-icon">
                            <a
                                href="https://www.facebook.com/profile.php?id=100003819070404"
                                className="facebook"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fab fa-facebook" />
                            </a>
                        </li>
                        <li className="social-icon">
                            <a
                                href="https://www.instagram.com/kjang_hochul/"
                                className="instagram"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fab fa-instagram" />
                            </a>
                        </li>
                        <li className="social-icon">
                            <a
                                href="https://www.linkedin.com/in/kyochul-jang-93b263208/"
                                className="linked-in"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                        <li className="social-icon">
                            <a
                                href="https://github.com/OfficerChul"
                                className="github"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="fab fa-github"></i>
                            </a>
                        </li>
                    </div>
                </div>
            </footer>

        </div>


    );
}

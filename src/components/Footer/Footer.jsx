import React from 'react'
import Banner from './banner.png';
import './Footer.css';
import Projects from '../Projects-Carousel/Projects-Carousel';

function Footer() {
    return (
        <div className="footer-container bg-blue-200 ">
            <footer class="p-4 bg-blue-200 sm:p-6 dark:bg-gray-900">
                <div class="md:flex md:justify-between" >
                    <div class="mb-6 md:mb-0">
                        <a href="https://kyochuljang.com/" class="flex items-center">
                            <img src={Banner} class="h-20" alt="FlowBite Logo" />

                        </a>
                    </div>
                    <div id='project-carousel'>
                        <a href='#projects'>
                            <Projects />
                        </a>
                    </div>

                    <div class="ml-2 grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul class="text-gray-600 pl-0 dark:text-gray-400">
                                <li class="mb-4">
                                    <a href="https://flowbite.com/" class="hover:underline">Flowbite</a>
                                </li>
                                <li class="mb-4">
                                    <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                                </li>
                                <li class="mb-4">
                                    <a href="https://codepen.io/" class="hover:underline">CodePen</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Me</h2>
                            <ul class="text-gray-600 pl-0 dark:text-gray-400">
                                <li class="mb-4">
                                    <a href="https://github.com/OfficerChul" class="hover:underline ">Github</a>
                                </li>
                                <li class="mb-4">
                                    <a href="https://www.linkedin.com/in/kyochul-jang-93b263208/" class="hover:underline">LinkedIn</a>
                                </li>
                                <li class="mb-4">
                                    <a href="https://www.instagram.com/kjang_hochul/" class="hover:underline">Instagram</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">On Portfolio</h2>
                            <ul class="text-gray-600 pl-0 dark:text-gray-400">
                                <li class="mb-4">
                                    <a href="#top" class="hover:underline">Top</a>
                                </li>
                                <li>
                                    <a href="#about1" class="hover:underline">About Me</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div class="sm:flex sm:items-center sm:justify-between">
                    <span class="text-base text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://kyochuljang.com/" class="hover:underline">OfficerChul™</a>. All Rights Reserved.
                    </span>
                    <div class="flex space-x-6 sm:justify-center sm:mt-0 text-2xl">
                        <li className="social-icon">
                            <a
                                href="mailto:gcj1234567890@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                                className="mail"

                            >
                                <i classname="email" className="far fa-envelope"></i>
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
    )
}

export default Footer
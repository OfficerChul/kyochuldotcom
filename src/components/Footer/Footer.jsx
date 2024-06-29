import React from 'react'
import Banner from './banner.png';
import './Footer.css';
import GitHubCalendar from 'react-github-calendar';

function Footer() {

    function remHash() {
        setTimeout(() => {
            var uri = window.location.toString();
            if (uri.indexOf("#") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("#"));
                console.log(window.location.toString())
                console.log(clean_uri)
                window.history.replaceState('', document.title, clean_uri);

            }
        }, 5)
    }

    return (
        <div className="footer-container">
            <footer className="p-4 bg-blue-100 sm:p-6 dark:bg-gray-900">
                <div id="" className='sm:flex gap-3 sm:justify-between' >
                    <div className="flex justify-center">
                        <a href="https://kyochuljang.com/" className="">
                            <img src={Banner} className="h-20" alt="Banner" />

                        </a>
                    </div>
                    <div className='footer-tab flex flex-col text-left gap-2 bg-sky-200 sm:p-4 p-2 rounded-lg'>
                        <span className=' text-sm font-mono'>@OfficerChul on GitHub</span>
                        <a href='https://github.com/OfficerChul' className='text-black font-mono'><GitHubCalendar dateFormat username="officerchul" /></a>
                    </div>
                    <div className="footer-tab grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul className="text-gray-600 pl-0 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://codepen.io/" className="hover:underline">CodePen</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Me</h2>
                            <ul className="text-gray-600 pl-0 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="https://github.com/OfficerChul" className="hover:underline ">Github</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://www.linkedin.com/in/kyochul-jang-93b263208/" className="hover:underline">LinkedIn</a>
                                </li>
                                <li className="mb-4">
                                    <a href="https://www.instagram.com/kjang_hochul/" className="hover:underline">Instagram</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">On Website</h2>
                            <ul className="text-gray-600 pl-0 dark:text-gray-400 flex flex-col gap-y-4">
                                <li>
                                    <a href="#top" onClick={remHash} className="hover:underline">Top</a>
                                </li>
                                <li>
                                    <a href="#about1" onClick={remHash} className="hover:underline">About Me</a>
                                </li>
                                <li>
                                    <a href="#projects" onClick={remHash} className="hover:underline">Projects</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <hr className="my-6 border-black-200 sm:mx-auto dark:border-gray-700 lg:my-2 sm:w-0" />
                <div className="flex items-center justify-between gap-2">
                    <span className="text-base text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://kyochuljang.com/" className="hover:underline">OfficerChul™</a>. All Rights Reserved.
                    </span>
                    
                    <div className="flex space-x-6 sm:justify-center sm:mt-0 text-2xl">
                        <li className="social-icon">
                            <a
                                href="mailto:gcj1234567890@gmail.com"
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
    )
}

export default Footer
import React from 'react'
import GitHubCalendar from 'react-github-calendar';
import profile_pic from './profile-pic.jpg';


function Footer() {

    return (
        <div className="footer-container">
            <footer className="flex justify-center p-4 bg-blue-100 sm:p-6 dark:bg-gray-900 font-mono">

                <div id="" className='flex flex-col' >

                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                        <div className="flex flex-col items-center justify-between bg-[#bafcf1] rounded-lg shadow-xl p-5 ">
                            <a href='#top' className='hover:scale-150 transition duration-300 ease-in-out' ><img src={profile_pic} className="button-blink-bounce w-32 h-32 rounded-full border-4 border-white" alt="Profile" /></a>

                            <div className="text-center mt-4">
                                <p className="text-xl font-semibold text-gray-800">Get in Touch!!</p>
                                <p className="text-sm text-gray-500">Press to go higher</p>
                            </div>

                            <ul className="flex gap-3 mt-4">
                                <li><a href="https://www.instagram.com/" className="text-xl text-gray-600 hover:text-[#E1306C]"><i className="fa fa-instagram"></i></a></li>
                                <li><a href="https://www.linkedin.com/in/kyochul-jang/" className="text-xl text-gray-600 hover:text-[#0a66c2]]"><i className="fa fa-linkedin-in"></i></a></li>
                                <li><a href="https://github.com/OfficerChul" className="text-xl text-gray-600 hover:text-[#6e5494]"><i className="fa fa-github"></i></a></li>
                                <li><a href="https://discordapp.com/users/407062512840998922" className="text-xl text-gray-600 hover:text-[#7289da]"><i className="fa fa-discord"></i></a></li>
                            </ul>
                        </div>

                        <div className='flex flex-col gap-2 bg-sky-200 sm:p-8 p-4 rounded-lg justify-center shadow-xl'>

                            <span className=' text-sm font-mono '>@OfficerChul on GitHub</span>
                            <a href='https://github.com/OfficerChul' className='text-black font-mono'><GitHubCalendar dateFormat username="officerchul" /></a>
                        </div>

                    </div>

                    <span className="mt-5 text-base font-mono text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://kyochuljang.com/" className="hover:underline">OfficerChul™</a>. All Rights Reserved.</span>

                </div>


            </footer>

        </div>
    )
}

export default Footer
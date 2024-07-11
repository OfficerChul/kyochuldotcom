import React from 'react'
import Banner from './banner.png';
import GitHubCalendar from 'react-github-calendar';

function Footer() {

    return (
        <div className="footer-container">
            <footer className="p-4 bg-blue-100 sm:p-6 dark:bg-gray-900">
                <div id="" className='flex flex-col sm:flex-row gap-3 justify-between' >
                    <div className="flex justify-between flex-col">
                        <a href="https://kyochuljang.com/" className="">
                            <img src={Banner} className="h-20" alt="Banner" />
                        </a>
                        <span className="text-base font-mono text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://kyochuljang.com/" className="hover:underline">OfficerChul™</a>. All Rights Reserved.</span>

                    </div>
                    <div className='flex flex-col gap-2 bg-sky-200 sm:p-8 p-4 rounded-lg'>
                        <span className=' text-sm font-mono'>@OfficerChul on GitHub</span>
                        <a href='https://github.com/OfficerChul' className='text-black font-mono'><GitHubCalendar dateFormat username="officerchul" /></a>
                    </div>

                </div>

            </footer>

        </div>
    )
}

export default Footer
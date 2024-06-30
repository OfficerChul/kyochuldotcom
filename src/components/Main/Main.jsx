import React from 'react'
import logo from './triangle-skyblue.png';
import SimpleIcon from '../SimpleIcon/SimpleIcon';
import './Main.css'
import Navigation from '../Navigation/Navigation';



export default function Searchbar() {


    return (
        <div className="main">
            <Navigation />

            <div className="mt-20">
                <img className="mx-auto mt-5 logo h-52 md:h-60" src={logo} alt='logo' id='main-logo' />
                <form action='https://www.google.com/search' method='GET'>
                    <div className="w-full flex items-center justify-center">
                        <div className="relative w-3/4vw md:w-1/2 lg:w-2/5">
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input
                                name='q'
                                type='text'
                                className='shadow-custom border-none w-full rounded-full h-10 pl-10'
                                placeholder='Search Google or type a URL'
                                id='search-bar'
                            />
                        </div>
                    </div>
                </form>

                <div className="menu mt-4">

                    {/* <Link to="portfolio"><span className='text-sky-500 mb-3 flex justify-center'>Portfolio Website!</span><MagicCard site='portfolio-img' /></Link>
                <a href='https://officerchul.github.io/'><span className='text-white mb-3 flex justify-center'>Jekyll Blog</span><MagicCard site='blog-img'/></a>                 */}
                </div>
                
                <SimpleIcon />
            </div>


        </div>
    )
}

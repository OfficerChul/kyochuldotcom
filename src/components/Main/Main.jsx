import React from 'react'
import logo from './triangle-skyblue.png';
import SimpleIcon from '../SimpleIcon/SimpleIcon';
import './Main.css'
import { Link } from 'react-router-dom';
import Like from '../Like/Like';
import MagicCard from '../MagicCard/MagicCard';


export default function Searchbar() {
    return (
        <div className="main">
            
            <nav className="flex bg-slate-200" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3 pt-1  mb-2">
                    <li className="inline-flex items-center aria-current='page'">
                        <div className="flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <svg className="text-sm font-medium text-black-500 dark:text-gray-400 w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Home
                            </Link>

                        </div>
                    </li>
                    <li>
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>

                    </li>
                </ol>
            </nav>

            <img className="mx-auto mt-5 logo" src={logo} alt='logo' id='main-logo' />
            <form action='https://www.google.com/search' method='GET'>
                <div style={{ width: '50%' }} className="mx-auto search-bar input-group" >
                    <input name='q' type='text' className='shadow-sm form-control rounded-pill card' placeholder='Search Google or type a URL' id='search-bar' />
                </div>
            </form>
          
            

            
            <Like />
            <div className="menu">
                <Link to="portfolio"><MagicCard site='portfolio-img' /></Link>
                <a href='https://officerchul.github.io/'><MagicCard site='blog-img'/></a>
                
                
            </div>
            <SimpleIcon />
            

        </div>
    )
}

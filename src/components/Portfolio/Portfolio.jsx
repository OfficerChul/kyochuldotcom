import React from 'react'
import './Portfolio.css'
import About1 from '../About1/About1'
import Projects from '../Projects/Projects'
import Footer from '../Footer/Footer'
import logo from '../Main/triangle-green.png';
import FancyBtn from '../FancyBtn/FancyBtn'
import { Link } from 'react-router-dom';
import { Bounce } from 'react-reveal';
import HeadShake from 'react-reveal/HeadShake';


export default function Portfolio() {
    return (
        <>
            <nav className="flex bg-slate-200" aria-label="Breadcrumb" id='top'>
                <ol className="inline-flex items-center space-x-1 md:space-x-3 pt-1 mb-2">
                    <li className="inline-flex items-center arai-current='page'">
                        <div className="flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Home
                            </Link>


                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center justify-center">
                            <Link to='/portfolio' className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Portfolio</span>
                            </Link>
                        </div>
                    </li>
                    <p className="pt-2 text-sm absolute top-0 right-0">This website was created entirely by myself, without the use of any pre-made themes or templates.</p>
                </ol>
            </nav>

            <header className='wrapper'>

                <div id="top" className="">

                    <Link to='/'><img style={{ zIndex: 1000 }} className='to-main' src={logo} alt='logo' /></Link>

                    <h1 className='header-text bungee'><span id="welcome-sign">Welcome to </span><br /><span className="appear">my Website :)</span></h1>


                    <div className="content ml-1">
                        <h2 className='bungee'>
                            <Bounce left cascade>Kyochul Jang</Bounce></h2>
                        <h2 className='bungee'><Bounce left cascade>Kyochul Jang</Bounce></h2>
                    </div>
                    <HeadShake forever={1} duration={2000}>
                        <div className="flex absolute">
                            <FancyBtn url='#about1' btnText='About Me!'/>
                        </div>
                    </HeadShake>




                </div>
                




            </header>

            <About1 id='about1' />            
            <Projects id='projects' />

            <footer>

                <Footer />
            </footer>

        </>
    )
}

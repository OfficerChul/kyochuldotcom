import React from 'react'
import './Portfolio.css'
import About1 from '../About1/About1'
import About2 from '../About2/About2'
import Projects from '../Projects/Projects'
import Contact from '../Contact/Contact'
import logo from '../Main/triangle-green.png';
import { Link } from 'react-router-dom';



export default function Portfolio() {
    return (
        <>
            <header className='wrapper'>
                <div id="top" class="appear">


                    <Link to='/'><img className='to-main' src={logo} alt='logo' /></Link>
                    <h1 className='header-text'>Welcome to <span className="appear d1">my Website :)</span></h1>

                    <div className="content">

                        <h2 className=''>Kyochul Jang</h2>
                        <h2 className=''>Kyochul Jang</h2>

                    </div>
                </div>
            </header>
            <About1 />
            {/* <About2 /> */}
            
            <Projects />
            
            <footer>
                <Contact />
            </footer>

        </>
    )
}

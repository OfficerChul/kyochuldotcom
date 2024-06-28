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
import Navigation from '../Navigation/Navigation';


export default function Portfolio() {
    return (
        <>
            <Navigation />

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

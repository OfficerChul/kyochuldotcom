import React from 'react'
import './Portfolio.css'
import AboutMe from '../AboutMe/AboutMe'
import Projects from '../Projects/Projects'
import Footer from '../Footer/Footer'
import logo from '../Main/triangle-green.png';
import FancyBtn from '../FancyBtn/FancyBtn'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { JackInTheBox} from 'react-awesome-reveal';


export default function Portfolio() {
    return (
        <>
            <Navigation />

            <header className='wrapper'>

                <div id="top" className="">

                    <Link to='/'><img style={{ zIndex: 1000 }} className='to-main absolute w-14 rounded-full right-5 blink-portfolio' src={logo} alt='logo' /></Link>

                    <h1 className='header-text bungee'><span id="welcome-sign">Welcome to </span><br /><span className="appear">my Website :)</span></h1>

                    <JackInTheBox cascade triggerOnce={true}>
                        <div className="content ml-1 md:bottom-10">
                            <h2>{'Kyochul Jang'}</h2>
                            <h2>{'Kyochul Jang'}</h2>
                        </div>
                    </JackInTheBox>
                    
                    <div className="flex absolute scale-50 left-[1px] mt-5 sm:scale-100 sm:top-40 md:top-48 2xl:top-72">
                        <FancyBtn url='#about1' btnText='About Me!' />
                    </div>
                    




                </div>





            </header>

            <AboutMe id='about1'/>
            <Projects id='projects'/>

            <footer>

                <Footer />
            </footer>

        </>
    )
}

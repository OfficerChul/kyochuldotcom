import React from 'react'
import './Portfolio.css'
import About1 from '../About1/About1'
import About2 from '../About2/About2'
import Projects from '../Projects/Projects'
import Contact from '../Contact/Contact'



export default function Portfolio() {
    return (
        <>
            <header className='wrapper'>
                <div id="top" class="appear">



                    <h1 className='header-text'>Welcome to <span className="appear d1">my Website :)</span></h1>

                    <div className="content">

                        <h2 className='appear'>Kyochul Jang</h2>
                        <h2 className='appear'>Kyochul Jang</h2>

                    </div>
                </div>
            </header>
            <About1 />
            <About2 />
            

            <Projects />
            
            <footer>
                <Contact />
            </footer>

        </>
    )
}

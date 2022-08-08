import React from 'react'
import './Portfolio.css'
import About from '../About/About'

export default function Portfolio() {
    return (
        <>
            <header className='wrapper'>
                <div id="top" class="appear">

                    <h1>Welcome to <span class="appear d1">my Website :)</span> <br /><span class="appear d2">My name is</span> <span class="appear d3">Kyochul Jang</span></h1>

                    <div class="appear d4">
                        <h3>Feel free <span class="appear d8">to look around!</span></h3>

                    </div>
                </div>
            </header>
            <About />
        </>
    )
}

import React from 'react'
import './Portfolio.css'
import About1 from '../About1/About1'

export default function Portfolio() {
    return (
        <>
            <header className='wrapper'>
                <div id="top" class="appear">

                    <h1 className='header-text'>Welcome to <span className="appear d1">my Website :)</span> <br /><span className="appear d2">My name is</span><br />
                        <span className="appear d3">Kyochul</span><span className='appear d4'>&nbsp;Jang</span></h1>
                </div>
            </header>
            <About1 />
        </>
    )
}

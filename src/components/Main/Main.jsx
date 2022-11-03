import React from 'react'
import logo from './triangle-green.png';
import SimpleIcon from '../SimpleIcon/SimpleIcon';
import './Main.css'

export default function Searchbar() {
    return (
        <div className="main">
            <img className="mx-auto mt-5 logo" src={logo} alt='logo' id = 'main-logo'/>
            <form action='https://www.google.com/search' method='GET'>
                <div style={{width: '50%'}} className="mx-auto search-bar input-group mb-3" >
                    <input  name='q' type='text' className='shadow-sm form-control rounded-pill mb-3' placeholder='Search Google or type a URL'  id='search-bar'/>
                </div>
            </form>

            <SimpleIcon />

        </div>
    )
}

import React from 'react'
import logo from './triangle-green.png';
import SimpleIcon from '../SimpleIcon/SimpleIcon';

export default function Searchbar() {
    return (
        <div className="main">
            <img className="mx-auto w-2 " src={logo} alt='logo' />
            <form action='https://www.google.com/search' method='GET'>
                <div className="mx-auto search-bar input-group mb-3">
                    <input style={{width: "100%"}} name='q' type='text' className='shadow-sm form-control rounded-pill' placeholder='Search Google or type a URL' />
                </div>
            </form>

            <SimpleIcon />

        </div>
    )
}

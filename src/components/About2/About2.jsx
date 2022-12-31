import React from 'react';
import './About2.css';
import myPic1 from './mypic.jpg';
import myPic2 from './mypic2.jpg';
import { Fade } from 'react-reveal';


export default function About2() {
    return (
        <div className='about-2'>
            <div className='container' fluid="md">
                <div className="row">
                    <Fade right>
                        <div className='col-sm mt-5 about2'>

                            <h2 id='about2-title'>About Me</h2>
                            <img src={myPic2} alt='myPic' class="img-thumbnail myPic mt-5 p-3" id='myPic2' />

                        </div>
                        <div className='col-sm' id='pics'>
                            <img src={myPic1} alt='myPic' class="img-thumbnail myPic mt-5 p-3" />
                        </div>
                    </Fade>


                </div>

            </div>

        </div>
    )
}

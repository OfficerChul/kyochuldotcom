import React from 'react';
import './About2.css';
import myPic1 from './mypic.jpg';

export default function About2() {
    return (
        <div className='about-2'>
            <div className='container' fluid="md">
                <div className="row">
                    <div className='col-sm mt-5 about2'>
                        <div className="about-content">
                            <h2 className='about-title'>About Me</h2>
                            <h2 className='about-title1'>About Me</h2>
                        </div>
                        <h1 className='about-context'><span className='span-two'><h1 className='emphasize-two'>My hobby</h1> is playing golf and cooking. <br />Since I love nature.
                            So, I often go on a travel to a place with a huge nature.
                            <h1 className='emphasize-two'>I am a</h1>very passionate person. <br /> I like to learn and challenge new things.<br />
                            <h1 className='emphasize-two'>I also like</h1> to make new friends! Feel free to contact me!
                            </span>
                        </h1>
                    </div>
                    <div className='col-sm about1'>
                        <img src={myPic1} alt='myPic' class="img-thumbnail myPic mt-5 p-3" />
                    </div>


                </div>

            </div>

        </div>
    )
}

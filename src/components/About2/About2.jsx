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
                        <h1 className='about-context'><span className='span-two'><h1 className='emphasize-two'>My hobby</h1> is playing golf and cooking. <br />
                            <h1 className='emphasize-two'>My favorite food is</h1> Korean food. I love to make Korean foods and share with other people from different cultures.
                            <h1 className='emphasize-two'>I also like</h1> to make new friends, especially friends from various cultures to learn about their cultures share our cultures.
                            <h1 className='emphasize-two'>I am a</h1>very passionate and ardent person. <br /> I like to learn and challenge new things.<br />
                            <br/>
                            <h1>If you are interested in me,</h1>

                            <h1>Feel free to contact me!</h1>
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

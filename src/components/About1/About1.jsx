import React from 'react'
import { Container, Row, Col, Images } from 'react-bootstrap'
import myPic from './myPicture.jpg';
import './About1.css';

export default function About() {
    return (
        <div className='about'>
            <div className='container' fluid="md">
                <div className="row">
                    <div className='col about1'>
                        <img src={myPic} alt='myPic' class="img-thumbnail myPic mt-5 p-3" />
                    </div>
                    <div className='col about2'>
                        <h1 className='mt-5 about-title'>About Me</h1>
                        <h1 className='mb-5 about-context'>Hi, I am Kyochul Jang, <br />a Computer Science student at Purdue Univeristy.</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

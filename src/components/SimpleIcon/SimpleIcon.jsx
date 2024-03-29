import React, {useState} from 'react'
import './SimpleIcon.css'
import { Link } from 'react-router-dom'
// import resume from '../../../public/CV_no_gpa.pdf';
import Modal from 'react-modal';

export default function SimpleIcon() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
            <section id="set-8">
                <div className="blurb-ripple-out-wrap hi-icon-effect-8 mt-4 links">

                    <i onClick={() => setIsModalOpen(true)} className="blurb-ripple-out fa fa-file text-white">Resume</i>
                    <Modal
                        isModalOpen={1}
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        closeTimeoutMS={200}
                        style={{ overlay: { zIndex: 1 } }}
                    >
                        <iframe width="100%" height="100%" className='resume-modal-iframe' src={'CV_no_gpa.pdf'} title='Kyochul Resume'></iframe>
                    </Modal>
                    <a href="https://www.linkedin.com/in/kyochul-jang-93b263208/"><i className="blurb-ripple-out fa  fa-linkedin" style={{ color: "#0E76A8" }}>LinkedIn</i></a>
                    <a href="https://www.instagram.com/kjang_hochul/"><i className="blurb-ripple-out fa  fa-instagram" style={{ color: "#E1306C" }}>Instagram</i></a>
                    <a href="https://github.com/OfficerChul"><i className="blurb-ripple-out fa  fa-github-alt" style={{ color: "#77579d" }}>GitHub</i></a>
                    <Link to="portfolio"><i className="blurb-ripple-out fa  fa-star" style={{ color: "#fce903" }}>Portfolio</i></Link>
                    {/* <a href='portfolio'><i className="blurb-ripple-out fa  fa-star" style={{ color: "#fce903" }}>Portfolio</i></a> */}
                    <a href='mailto:gcj1234567890@gmail.com'><i className="blurb-ripple-out fa  fa-envelope" style={{ color: "#368BFE" }}>Email</i></a>
                </div>
            </section>
        </div>
    )
}

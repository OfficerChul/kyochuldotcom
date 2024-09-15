import React, { useState } from 'react'
import './SimpleIcon.css'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
// import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function SimpleIcon() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [numPages, setNumPages] = useState();
    // const [pageNumber, setPageNumber] = useState(1);

    // function onDocumentLoadSuccess({ numPages }) {
    //     setNumPages(numPages);
    // }

    return (
        <div>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
            <section id="set-8">
                <div className="blurb-ripple-out-wrap flex justify-center flex-wrap flex-col">
                    <div className="flex justify-center gap-3 sm:gap-12">
                        <Link to="portfolio"><i className="blurb-ripple-out fa  fa-star shadow-custom button-blink-bounce" style={{ color: "#fce903" }}></i></Link>
                        <a href="https://scholar.google.com/citations?user=N8R4s1kAAAAJ&hl=ko&oi=ao" target="_blank"  rel="noopener noreferrer">
                            <i
                                className="blurb-ripple-out shadow-custom flex justify-center items-center"
                                style={{ display: 'flex' }}
                            >
                                <img
                                    className="w-11"
                                    src="./google_scholar_icon.png"
                                    alt="google-scholar"
                                />
                            </i>
                        </a>
                        {/* <i onClick={() => setIsModalOpen(true)} className="blurb-ripple-out fa fa-address-card shadow-custom" style={{ color: '#004E89' }}></i> */}
                        <i onClick={() => setIsModalOpen(true)} className="blurb-ripple-out shadow-custom flex justify-center items-center" style={{ display: 'inline-flex' }}>
                            <img className='w-10' src='./cv_icon.png' alt='cv' />
                        </i>
                        <Modal
                            isModalOpen={1}
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            closeTimeoutMS={200}
                            style={{
                                overlay: {
                                    zIndex: 1000, // zIndex 값을 조절하여 다른 요소들 위에 올라오도록 설정
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)' // 배경색 추가
                                },
                                content: {

                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    right: 'auto',
                                    bottom: 'auto',
                                    transform: 'translate(-50%, -50%)',
                                    width: '50vw', // 전체 너비의 80%
                                    height: '90vh', // 전체 높이의 90%
                                    border: '1px solid #ccc',
                                    background: 'white',
                                    borderRadius: '10px',
                                    // overflow: 'hidden',
                                    display: 'flex', // Flexbox를 사용하여 자식 요소를 중앙에 배치
                                    justifyContent: 'center', // 가로 방향 중앙 정렬
                                    alignItems: 'center' // 세로 방향 중앙 정렬

                                }
                            }}
                        >
                            <iframe style={{
                                width: '100%', // iframe 너비를 모달 크기에 맞춤
                                height: '100%', // iframe 높이를 모달 크기에 맞춤
                                border: 'none',
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                transform: 'translate(-50%, -50%)',
                                // width: '50vw', // 전체 너비의 80%
                                // height: '90vh', // 전체 높이의 90%
                                background: 'black',
                                borderRadius: '10px',
                                outline: 'none',
                                padding: '20px',
                                // paddingLeft: '20px',
                                display: 'flex', // Flexbox를 사용하여 자식 요소를 중앙에 배치
                                justifyContent: 'center', // 가로 방향 중앙 정렬
                                alignItems: 'center' // 세로 방향 중앙 정렬
                            }} className='resume-modal-iframe' src={'Kyochul_Jang___CV.pdf'} title='Kyochul Resume'></iframe>
                            {/* <Document
                                file="Kyochul_Jang___CV.pdf"
                                onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pageNumber} />
                            </Document>
                            <p>
                                <span onClick={() => pageNumber > 1 ? setPageNumber(pageNumber - 1) : null}>
                                    &lt;
                                </span>
                                <span>Page {pageNumber} of {numPages}</span>
       	//다음 페이지 보기
                                <span onClick={() => pageNumber < numPages ? setPageNumber(pageNumber + 1) : null}>
                                    &gt;
                                </span>
                            </p> */}


                        </Modal>
                    </div>

                    <div className="flex justify-center gap-3 sm:gap-12 mt-4 sm:mt-3">
                        <a href="https://www.linkedin.com/in/kyochul-jang-93b263208/" target="_blank"  rel="noopener noreferrer"><i className="blurb-ripple-out shadow-custom fa  fa-linkedin" style={{ color: "#0E76A8" }}></i></a>

                        <a href="https://www.instagram.com/kjang_hochul/" target="_blank"  rel="noopener noreferrer"><i className="blurb-ripple-out fa fa-instagram shadow-custom" style={{ color: "#E1306C" }}></i></a>
                        <a href="https://github.com/OfficerChul" target="_blank"  rel="noopener noreferrer"><i className="blurb-ripple-out fa  fa-github shadow-custom" style={{ color: "#77579d" }}></i></a>
                        <a href='mailto:gcj1234567890@gmail.com' target="_blank"  rel="noopener noreferrer"><i className="blurb-ripple-out fa  fa-envelope shadow-custom" style={{ color: "#368BFE" }}></i></a>
                    </div>
                </div>
            </section>
        </div>
    )
}

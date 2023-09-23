import React, { useEffect, useState } from 'react';
import './App1.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel';

const UploadImg = () => {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const [file1, setFile1] = useState();
    function handleChange1(e) {
        console.log(e.target.files);
        setFile1(URL.createObjectURL(e.target.files[0]));
    }
    const [file2, setFile2] = useState();
    function handleChange2(e) {
        console.log(e.target.files);
        setFile2(URL.createObjectURL(e.target.files[0]));
    }
    const [file3, setFile3] = useState();
    function handleChange3(e) {
        console.log(e.target.files);
        setFile3(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            {/* <Avatar
                width={400}
                height={300}
                ></Avatar> */}

            <div>
                <h1 className='header_name'>Before and After images</h1>

                <div class="container_fluid" style={{padding: "10px 60px 10px 60px"}}>

                {/* <div style={{ width: 700, padding: 30}}>
                    <Carousel interval={null}>
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src="../../../assets/before&after1.png"
                                alt="Image One"
                                style={{height: "500px"}}
                            />

                        </Carousel.Item>
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src="../../../assets/before&after2.png"
                                alt="Image Two"
                                style={{height: "500px"}}
                            />

                        </Carousel.Item>
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src="../../../assets/before&after3.png"
                                alt="Image Two"
                                style={{height: "500px"}}
                            />

                        </Carousel.Item>
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src="../../../assets/before&after4.png"
                                alt="Image Two"
                                style={{height: "500px"}}
                            />

                        </Carousel.Item>
                    </Carousel>
                </div> */}
                </div>

                <div class="profile-pic">

                    <div className="container-ggg">
                        <div className="no">

                            <button className='before'>Before</button>
                            <input id="file" className="custom-file-input" title='Upload image Focal length 20mm-200mm' type="file" onChange={handleChange} />
                            {file &&
                                <img src={file} className="cal" width="340" height="500" />
                            }
                        </div>

                        <div className="no">
                            {file &&
                                <div>
                                    <label className='before'>After</label>
                                    <input id="file" className="custom-file-input" type="file" onChange={handleChange1} />
                                </div>
                            }

                            <img src={file1} className="cal" width="340" height="500" />
                        </div>

                    </div>
                </div>

                <div class="profile-pic">

                    <div className="container-ggg1">
                        <div className="no1">

                            <input id="file" className="custom-file-input" type="file" onChange={handleChange2} />
                            <label>Before</label>
                            {file2 &&
                                <img src={file2} className="cal" width="500" height="238" />
                            }
                        </div>

                        <div className="no1">
                            {file2 &&
                                <input id="file" className="custom-file-input" type="file" onChange={handleChange3} />
                            }
                            <img src={file3} className="cal" width="500" height="238" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadImg;


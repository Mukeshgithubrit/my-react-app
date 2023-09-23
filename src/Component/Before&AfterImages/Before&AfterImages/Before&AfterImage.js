import React, { useState } from 'react';
import './Before&AfterImage.css';
// import { ImgComparisonSlider } from '@img-comparison-slider/react';

const UploadImg1 = () => {
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
    return (
        <div className='Slider_Container'>
            <div>
                <h1 className='header_name'>Before and After images</h1>

                <div className='Comparison_slider'>
                    {/* <ImgComparisonSlider style={{ width: "350px" }}> */}
                        <img
                            slot="first"
                            src="../../../assets/logo192.png"
                            className='First_Image'
                            style={{ width: "100%" }}
                        />
                        <img
                            slot="second"
                            src="../../../assets/logo192.png"
                            className='Second_Image'
                            style={{ width: "100%" }}
                        />
                    {/* </ImgComparisonSlider> */}
                </div>

                {/* <div className='Comparison_slider'>
                    <ImgComparisonSlider>
                        <img
                            slot="first"
                            src={file}
                            className='First_Image'
                            style={{width: "100%"}}
                        />
                        <img
                            slot="second"
                            src={file1}
                            className='Second_Image'
                            style={{width: "100%"}}
                        />
                    </ImgComparisonSlider>
                </div> */}

                <div>
                    <div className="Image_Container">
                        <div className="Before_Image">

                            <button className='before_Text'>Before</button>
                            <input id="file" className="custom-file-input" title='Upload image Focal length 20mm-200mm' type="file" onChange={handleChange} />
                            {file &&
                                <img src={file} className="Image_File" width="100%" height="500" />
                            }
                        </div>

                        <div className="Before_Image">
                            {file &&
                                <div>
                                    <label className='after_Text'>After</label>
                                    <input id="file" className="custom-file-input" type="file" onChange={handleChange1} />
                                </div>
                            }
                            <img src={file1} className="cal" width="100%" height="500" />
                        </div>
                    </div>
                </div>

                {/* <div class="profile-pic">

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
                </div> */}
            </div>
        </div>
    );
}

export default UploadImg1;
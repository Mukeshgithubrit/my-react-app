import React, { useState } from 'react';
import './VirtulConsultation.css';

const Virtual1 = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [showModalArea1, setShowModalArea1] = useState(false);
    const [showModalArea2, setShowModalArea2] = useState(false);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setCheckedItems((prevChecked) => [...prevChecked, value]);
        } else {
            setCheckedItems((prevChecked) => prevChecked.filter(item => item !== value));
        }
    };

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const handleToggle1 = () => {
        setIsChecked1(!isChecked1);
    };

    //Area 1
    const handleClickArea1 = () => {
        setShowModalArea1(true);
    };
    const hideModalArea1 = () => {
        setCheckedItems([]);
        setShowModalArea1(false);
    };

    //Symptoms for area 1
    const handleClickArea2 = () => {
        setShowModalArea2(true);
    };
    const hideModalArea2 = () => {
        setShowModalArea2(false);
    };
    return (
        <div>
            <div className='Virtual-container'>
                <div className="Container_Header">
                    <a href="#">
                        <img src="../../../assets/Bitcare.webp" alt="logo" className="Bitcare-logo" width="200px" />
                    </a>
                </div>

                <div style={{ padding: "0px 50px" }}>
                    <h2>Virtual Consultation</h2>
                    <p>Please select your cosmetic concerns to receive confidential treatment recommendations by clicking on the appropriate body area on the model.<br />                     1. Place the Cursor on the desired Body Part (Toggle for front/back).<br />
                        2. Select the symptoms which best describe your condition.<br />
                        3. You can select multiple body parts and related symptoms. </p>
                </div>

                <div className="toggle-container">
                    {isChecked1 ? (
                        <div>
                            {isChecked ? (
                                <div className="image-container1" style={{ backgroundImage: `url('../../assets/Maleback.png')`, height: "580px", width: "250px", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                                    <div className="Map-overlay">
                                        <div className="MB-area1"></div>
                                        <div className="MB-area2"></div>
                                        <div className="MB-area3"></div>
                                        <div className="MB-area4"></div>
                                        <div className="MB-area5"></div>
                                        <div className="MB-area6"></div>
                                        <div className="MB-area7-1"></div>
                                        <div className="MB-area7-2"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="image-container1" style={{ backgroundImage: `url('../../assets/BackWomen.png')`, height: "580px", width: "250px", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                                    <div className="Map-overlay">
                                        <div className="WB-area1"></div>
                                        <div className="WB-area2"></div>
                                        <div className="WB-area3"></div>
                                        <div className="WB-area4"></div>
                                        <div className="WB-area5"></div>
                                        <div className="WB-area6"></div>
                                        <div className="WB-area7-1"></div>
                                        <div className="WB-area7-2"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {isChecked ? (
                                <div className="image-container1" style={{ backgroundImage: `url('../../assets/Malefront.png')`, height: "580px", width: "250px", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                                    <div className="Map-overlay">
                                        <div className="MF-area1"></div>
                                        <div className="MF-area2"></div>
                                        <div className="MF-area3"></div>
                                        <div className="MF-area4"></div>
                                        <div className="MF-area5"></div>
                                        <div className="MF-area6"></div>
                                        <div className="MF-area7-1"></div>
                                        <div className="MF-area7-2"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="image-container1" style={{ backgroundImage: `url('../../assets/FrontWomen.png')`, height: "580px", width: "250px", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                                    <div className="Map-overlay">
                                        <div className="WF-area1" onClick={() => handleClickArea1()}></div>
                                        <div className="WF-area2"></div>
                                        <div className="WF-area3"></div>
                                        <div className="WF-area4"></div>
                                        <div className="WF-area5"></div>
                                        <div className="WF-area6"></div>
                                        <div className="WF-area7-1"></div>
                                        <div className="WF-area7-2"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="toggle-button">
                    <div className='toggle_Container'>
                        <div className="toggle_content">Front</div>
                        <div className="toggle-switch">
                            <input type="checkbox" id="toggle1" checked={isChecked1} onClick={handleToggle1} />
                            <label htmlFor="toggle1" />
                        </div>
                        <div className="toggle_content">Back</div>
                    </div>

                    <div className='toggle_Container'>
                        <div className="toggle_content">Female</div>
                        <div className="toggle-switch">
                            <input type="checkbox" id="toggle" checked={isChecked} onClick={handleToggle} />
                            <label htmlFor="toggle" />
                        </div>
                        <div className="toggle_content">Male</div>
                    </div>
                </div>

                <div>
                    {showModalArea1 && (
                        <>
                            <div className="Modal-header">
                                <div className="Modal-content">
                                    <button type="button" onClick={hideModalArea1} className="Close-modal">&times;</button>
                                    <div>
                                        <h2>Select Symptoms</h2>
                                        <h4>Please add the concern(s) for head:</h4>
                                        <label className='head-symptoms'> Clogged Pores
                                            <input type="checkbox" value="Clogged Pores" onChange={handleCheckboxChange} style={{ width: "20px", height: "20px" }} />
                                        </label>
                                        <label className='head-symptoms'> Oily Skin
                                            <input type="checkbox" value="Oily Skin" onChange={handleCheckboxChange} style={{ width: "20px", height: "20px" }} />
                                        </label>
                                        <label className='head-symptoms'> Hyper-pigmented Skin Spots
                                            <input type="checkbox" value="Hyper-pigmented Skin Spots" onChange={handleCheckboxChange} style={{ width: "20px", height: "20px" }} />
                                        </label>
                                        <label className='head-symptoms'> Acne
                                            <input type="checkbox" value="Acne" onChange={handleCheckboxChange} style={{ width: "20px", height: "20px" }} />
                                        </label>
                                        <label className='head-symptoms'> Sunken Cheeks
                                            <input type="checkbox" value="Sunken Cheeks" onChange={handleCheckboxChange} style={{ width: "20px", height: "20px" }} />
                                        </label>
                                        <label className='head-symptoms'> Wrinkles
                                            <input type="checkbox" value="Wrinkles" onChange={handleCheckboxChange} style={{ width: "20px", height: "20px" }} />
                                        </label>
                                        <button onClick={() => handleClickArea2()} className="sysmptoms_submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div>
                    {showModalArea2 && (
                        <>
                            <div className="modal_header">
                                <div className="modal_content">
                                    <div>
                                        <div className="checked-list">
                                            <h2>Preview Selected Symptoms</h2>
                                            <h3>head</h3>
                                            <ul>
                                                {checkedItems.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <button type='submit' onClick={hideModalArea2}>Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Virtual1;


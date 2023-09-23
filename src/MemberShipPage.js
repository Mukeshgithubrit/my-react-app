import React, { useState, useEffect } from "react";
import './MemberShipPage.css';
import { db, storage } from "./Firebase1";
import { getDocs, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const MemberShip = () => {
    const [memberShipList, setMemberShipList] = useState([]);
    const [memberShipName, setMemberShipName] = useState("");
    const [memberShipPrice, setMemberShipPrice] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [memberShipBenefits, setMemberShipBenefits] = useState(["value"]);
    const [inputPairs, setInputPairs] = useState([{ title: '', description: '' }]);
    const [memberShipIncluded, setMemberShipIncluded] = useState(["value"]);
    const [memberShipTag, setMemberShipTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const memberShipCollectionRef = collection(db, "membership");

    //Fetching the data
    const getMemberSipDetails = async () => {
        try {
            const data = await getDocs(memberShipCollectionRef);
            const member = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setMemberShipList(member);
        } catch (err) {
            console.error(err);
        }
    };


    //Add the title and description fields
    const handleChange = (index, field, value) => {
        const updatedPairs = [...inputPairs];
        updatedPairs[index][field] = value;
        setInputPairs(updatedPairs);
    };
    console.log(inputPairs);

    const handleAddPair = () => {
        setInputPairs([...inputPairs, { title: '', description: '' }]);
    };

    const handleRemovePair = (index) => {
        const updatedPairs = [...inputPairs];
        updatedPairs.splice(index, 1);
        setInputPairs(updatedPairs);
    };

    //Add Benefits input field
    const handleAddBenefts = () => {
        const valves = [...memberShipBenefits, []];
        setMemberShipBenefits(valves);
    };

    const handleBenefits = (onChangeValue, index) => {
        const valves = [...memberShipBenefits];
        valves[index] = onChangeValue.target.value;
        setMemberShipBenefits(valves);
    };

    const handleRemoveBenefits = (index) => {
        const updatedPairs = [...memberShipBenefits];
        updatedPairs.splice(index, 1);
        setMemberShipBenefits(updatedPairs);
    };

    //Add Included input field
    const handleAddIncluded = () => {
        const valves = [...memberShipIncluded, []];
        setMemberShipIncluded(valves);
    };

    const handleIncluded = (onChangeValue, index) => {
        const valves = [...memberShipIncluded];
        valves[index] = onChangeValue.target.value;
        setMemberShipIncluded(valves);
    };

    const handleRemoveIncluded = (index) => {
        const updatedPairs = [...memberShipIncluded];
        updatedPairs.splice(index, 1);
        setMemberShipIncluded(updatedPairs);
    };

    useEffect(() => {
        getMemberSipDetails();
        if (alertMessage !== '') {
            alert(alertMessage);
            setAlertMessage('');
        }
    }, [alertMessage]);


    //Add the data
    const onSubmitMembership = async () => {
        setLoading(true);
        if (!imageUpload) return;
        const imageFolderRef = ref(storage, `files/${imageUpload.name}`)
        try {
            const uploadTask = uploadBytesResumable(imageFolderRef, imageUpload);

            uploadTask.on("state_changed", (snapshot) => { },
                error => {
                    console.log(error);
                }, () => {
                    const idRef = doc(collection(db, "membership"));
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            await setDoc(idRef, {
                                name: memberShipName,
                                price: memberShipPrice,
                                image: downloadURL,
                                benefits: memberShipBenefits,
                                desc: inputPairs,
                                included: memberShipIncluded,
                                tag: memberShipTag,
                                id: idRef.id,
                            });
                            setLoading(false);
                            getMemberSipDetails();
                            setAlertMessage('Data Uploaded Successfully!');
                        }
                    );
                }
            )
        } catch (err) {
            console.error(err);
        }
    }

    //Modal Data
    const showDetail = (memberId) => {
        setShowModal(true);
        const selected = memberShipList.find((member) => member.id === memberId);
        setShowModal(selected);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    //Modal Data
    const showDetail1 = (id) => {
        setShowModal1(true);
        const userC = memberShipList.find((member) => member.id === id);
        setSelectedRow(userC);
    };

    const hideModal1 = () => {
        setShowModal1(false);
    };

    //Edit the data
    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const docRef = doc(db, "membership", selectedRow.id);
            await updateDoc(docRef, {
                name: selectedRow.name,
                price: selectedRow.price,
                tag: selectedRow.tag,
                benefits: memberShipBenefits,
                desc: inputPairs,
                included: memberShipIncluded,
            })
            setSelectedRow({});
            getMemberSipDetails();
            setLoading(false);
            setShowModal1(false);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <div className="membership_container">
                <h2>Add the MemberShips</h2>
                <div className="membership_content">
                    <form className="membership_form">

                        <label for="name">Name</label>
                        <input
                            type="text"
                            className="membership_input"
                            placeholder="Enter the name..."
                            onChange={(e) => setMemberShipName(e.target.value)}
                        />

                        <label for="Description">Price</label>
                        <input
                            type="text"
                            className="membership_input"
                            placeholder="Enter the price..."
                            onChange={(e) => setMemberShipPrice(e.target.value)}
                        />

                        <label for="message">Image</label>
                        <input type="file" className="membership_input" onChange={(e) => setImageUpload(e.target.files[0])} style={{ backgroundColor: "white", padding: "20px" }} />

                        <label for="benefits">Benefits</label>
                        <div>
                            {memberShipBenefits.map((input, index) => (
                                <div key={index} className="Membership_benefits">
                                    <div style={{ gridColumn: "1 / 5" }}>
                                        <input
                                            type="text"
                                            value={input.value}
                                            className="membership_input"
                                            placeholder="Add the benefits..."
                                            onChange={(e) => handleBenefits(e, index)}
                                        />
                                    </div>
                                    <div style={{ paddingTop: "10px" }}>
                                        <input type="button" className="MemberShipRemove_Btn" onClick={() => handleRemoveBenefits(index)} value="Remove" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <input type="button" className="MemberShipAdd_Btn" onClick={handleAddBenefts} value="Add Benefits" />
                        </div>

                        {inputPairs.map((pair, index) => (
                            <div key={index}>
                                <div className="Membership_desc">
                                    <div className="Membership_title" style={{ gridColumn: "1 / 3" }}>
                                        <label for="Description">Title</label><br />
                                        <input
                                            type="text"
                                            className="membership_input"
                                            placeholder="Add the title..."
                                            value={pair.title}
                                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="Membership_description" style={{ gridColumn: "3 / 5" }}>
                                        <label for="Description">Description</label><br />
                                        <input
                                            type="text"
                                            className="membership_input"
                                            placeholder="Add the description..."
                                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                                            value={pair.description}
                                        />
                                    </div>

                                    <div className="Add_desc">
                                        <input type="button" className="MemberShipRemove_Btn" onClick={() => handleRemovePair(index)} value="Remove" />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div>
                            <input type="button" className="MemberShipAdd_Btn" onClick={handleAddPair} value="Add Fields" />
                        </div>

                        <label for="benefits">Treatments Included</label>
                        <div>
                            {memberShipIncluded.map((input1, index) => (
                                <div key={index} className="Membership_benefits">
                                    <div style={{ gridColumn: "1 / 5" }}>
                                        <input
                                            type="text"
                                            value={input1.value}
                                            className="membership_input"
                                            placeholder="Add the includedInfo..."
                                            onChange={(e) => handleIncluded(e, index)}
                                        />
                                    </div>
                                    <div style={{ paddingTop: "10px" }}>
                                        <input type="button" className="MemberShipRemove_Btn" onClick={() => handleRemoveIncluded(index)} value="Remove" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <input type="button" className="MemberShipAdd_Btn" onClick={handleAddIncluded} value="Add Included" />
                        </div>

                        <label for="Description">Tag</label>
                        <input
                            type="text"
                            className="membership_input"
                            placeholder="Enter the tag..."
                            onChange={(e) => setMemberShipTag(e.target.value)}
                        />


                        {loading ? (
                            <div style={{ textAlign: "center" }}><h4>adding the data...!!!</h4>
                                <img src="../../../assets/Loading.gif" /></div>
                        ) : (
                            <button className="MemberShipSubmit_Btn" onClick={onSubmitMembership}>Submit MemberShip</button>
                        )}

                    </form>
                </div>

                <div className="Membership_card">
                    {memberShipList && memberShipList.map((member) => (
                        <div className="Membership_data">
                            <img src={member.image} width="100%" height="200px" />
                            <div style={{ padding: "10px" }}>
                                <div className="membership_contentbtn">
                                    <h4 className="Membership_datacontent">{member.name}</h4>
                                    <button className="Memberships_btn" onClick={() => showDetail1(member.id)}>Edit</button>
                                </div>

                                <h4 className="Membership_datacontent">{member.price}</h4>
                                <button className="Memberships_btn" onClick={() => showDetail(member.id)}>See Benefits</button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <>
                        <div className="member_modal">
                            <div className="member_content">
                                <button type="button" onClick={hideModal} className="close_modalbtn">&times;</button>
                                <div className="modalmember_header">
                                    <img src={showModal.image} width="100%" height="250px" />
                                </div>

                                <div className="memberShip_modalContainer">
                                    <div className="memberShip_modalcontent">
                                        <h4 className="Membership_modalName">{showModal.name}</h4>
                                        <h4 className="Membership_modalPrice">{showModal.price}</h4>
                                    </div>
                                    <p className="Membership_modalTag">{showModal.tag}</p>
                                    <h2 className="MemberShip_Benefitsheader">Membership Benefits</h2>
                                    <div className="Membership_modalbenefits">
                                        {showModal.benefits.map((value, index) => (
                                            <li key={index}>{value}</li>
                                        ))}
                                    </div>
                                    <h2 className="MemberShip_modaltreatments">Treatments</h2>
                                    <p>Includes the following treatment</p>
                                    <div className="Membership_modalbenefits">
                                        {showModal.included.map((value, index) => (
                                            <li key={index}>{value}</li>
                                        ))}
                                    </div>
                                    <h2 className="MemberShip_modaltreatments">Treatment Descriptions</h2>
                                    {showModal.desc.map((value, index) => (
                                        <div key={index}>
                                            <h6>{value.title}</h6>
                                            <p>{value.description}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </>
                )}
            </div>

            {showModal1 && (
                <>
                    <div className="member_modal">
                        <div className="member_content" style={{paddingTop: "20px"}}>
                            <div className="locationmodal_header">
                                <h2>Update the MemberShip</h2>
                                <button type="button" onClick={hideModal1} className="close_locationModal">&times;</button>
                            </div>

                            <div className="locationdetails_content">
                                {selectedRow &&
                                    <form className="locationdetails_form" onSubmit={handleSubmit}>
                                        <label for="title">Name</label>
                                        <input
                                            type="text"
                                            className="locationdetails_input"
                                            placeholder="Enter the Title..."
                                            value={selectedRow?.name || ''}
                                            onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
                                        />

                                        <label for="address">Tag</label>
                                        <input
                                            type="text"
                                            className="locationdetails_input"
                                            placeholder="Enter the Address..."
                                            value={selectedRow?.tag || ''}
                                            onChange={(e) => setSelectedRow({ ...selectedRow, tag: e.target.value })}
                                        />

                                        <label for="address">Price</label>
                                        <input
                                            type="text"
                                            className="locationdetails_input"
                                            placeholder="Enter the Address..."
                                            value={selectedRow?.price || ''}
                                            onChange={(e) => setSelectedRow({ ...selectedRow, price: e.target.value })}
                                        />

                                        <label for="benefits">Benefits</label>
                                        <div>
                                            {memberShipBenefits.map((input, index) => (
                                                <div key={index} className="Membership_benefits">
                                                    <div style={{ gridColumn: "1 / 5" }}>
                                                        <input
                                                            type="text"
                                                            value={input.value}
                                                            className="membership_input"
                                                            placeholder="Add the benefits..."
                                                            onChange={(e) => handleBenefits(e, index)}
                                                        />
                                                    </div>
                                                    <div style={{ paddingTop: "10px" }}>
                                                        <input type="button" className="MemberShipRemove_Btn" onClick={() => handleRemoveBenefits(index)} value="Remove" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <input type="button" className="MemberShipAdd_Btn" onClick={handleAddBenefts} value="Add Benefits" />
                                        </div>

                                        {inputPairs.map((pair, index) => (
                                            <div key={index}>
                                                <div className="Membership_desc">
                                                    <div className="Membership_title" style={{ gridColumn: "1 / 3" }}>
                                                        <label for="Description">Title</label><br />
                                                        <input
                                                            type="text"
                                                            className="membership_input"
                                                            placeholder="Add the title..."
                                                            value={pair.title}
                                                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="Membership_description" style={{ gridColumn: "3 / 5" }}>
                                                        <label for="Description">Description</label><br />
                                                        <input
                                                            type="text"
                                                            className="membership_input"
                                                            placeholder="Add the description..."
                                                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                                                            value={pair.description}
                                                        />
                                                    </div>

                                                    <div className="Add_desc">
                                                        <input type="button" className="MemberShipRemove_Btn" onClick={() => handleRemovePair(index)} value="Remove" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div>
                                            <input type="button" className="MemberShipAdd_Btn" onClick={handleAddPair} value="Add Fields" />
                                        </div>

                                        <label for="benefits">Treatments Included</label>
                                        <div>
                                            {memberShipIncluded.map((input1, index) => (
                                                <div key={index} className="Membership_benefits">
                                                    <div style={{ gridColumn: "1 / 5" }}>
                                                        <input
                                                            type="text"
                                                            value={input1.value}
                                                            className="membership_input"
                                                            placeholder="Add the includedInfo..."
                                                            onChange={(e) => handleIncluded(e, index)}
                                                        />
                                                    </div>
                                                    <div style={{ paddingTop: "10px" }}>
                                                        <input type="button" className="MemberShipRemove_Btn" onClick={() => handleRemoveIncluded(index)} value="Remove" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <input type="button" className="MemberShipAdd_Btn" onClick={handleAddIncluded} value="Add Included" />
                                        </div>


                                        {loading ? (
                                            <div style={{ textAlign: "center" }}><h4>Updating the data...!!!</h4>
                                                <img src="../../../assets/Loading.gif" /></div>
                                        ) : (
                                            <button className="locationSubmit_Btn" type="submit">Save the data</button>
                                        )}

                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default MemberShip;

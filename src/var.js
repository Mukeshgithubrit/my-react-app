// import React, { useState } from "react";

// function Mard() {
//     const { loading, setLoading } = useState(false);

//     const onSubmitService = () => {
//         setLoading(true);
//         setTimeout(() => {
//             setLoading(false);
//         }, 3500)
//     }
//     return (
//         <div>
//             {loading ? "" :
//                 (<button className="Submit" onClick={onSubmitService}>Submit Services</button>)}
//             {loading ? <div><h4>Fetching the data...!!!</h4>
//                 <img src="../../../assets/Loading.gif" /></div> : ''}
//         </div>
//     );
// }

// export default Mard;

import { useEffect } from "react";
import { useState } from "react";
import { db, auth, storage } from "./Firebase1";
import { collection, addDoc, getDocs, updateDoc, doc, get, update } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const Form = ({ formData, setFormData }) => {
//     const [title, setTitle] = useState(formData.title || '');
//     const [description, setDescription] = useState(formData.description || '');

//     const handleNameChange = (e) => {
//         setTitle(e.target.value);
//     };

//     const handleEmailChange = (e) => {
//         setDescription(e.target.value);
//     };

//     const handleSubmit = async(e, userid) => {
//         e.preventDefault();
//         const docRef = doc(db, "services4", userid);
//         await updateDoc(docRef, {
//             title: title,
//             description: description,
//         });
//         console.log(userid);
//         // Handle form submission here
//         // You can access the updated values of name and email state variables
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text" value={title} onChange={handleNameChange} />
//             </label>
//             <br />
//             <label>
//                 Description:
//                 <input type="text" value={description} onChange={handleEmailChange} />
//             </label>
//             <br />
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

function Data1() {
    const [header, setHeader] = useState('');
    const [content, SetContent] = useState('');
    const [dataList, setDataList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [locationCategory, setLocationCategory] = useState([]);


    const movieCollectionRef = collection(db, "services4");

    const handleAddField = () => {
        const valves = [...locationCategory, ""];
        setLocationCategory(valves);
        // setUpdatedCategory(valves);
    };

    const handleChange = (event, index) => {
        const valves = [...locationCategory];
        valves[index] = event.target.value;
        setLocationCategory(valves);
    };

    const handleRemovePair = (index) => {
        const updatedPairs = [...locationCategory];
        updatedPairs.splice(index, 1);
        setLocationCategory(updatedPairs);
        // setUpdatedCategory(updatedPairs);
    };

    const onSubmit = async () => {
        try {
            await addDoc(movieCollectionRef, {
                title: header,
                description: content,
            });
            getDataList();
        } catch (err) {
            console.error(err);
        }
    };

    const getDataList = async () => {
        try {
            const data = await getDocs(movieCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setDataList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getDataList();
    }, []);

    const onSelectRow = (id) => {
        setShowModal(true);
        const user = dataList.find((data) => data.id === id);
        setSelectedRow(user);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // }

    // const handleDescChange = (e) => {
    //     setDescription(e.target.value);

    // }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (locationCategory.length > 0) {
            console.log(locationCategory);
            try {
                const docRef = doc(db, "services4", selectedRow.id);
                await updateDoc(docRef, {
                    title: selectedRow.title,
                    description: selectedRow.description,
                    benefits: locationCategory,
                })
                setSelectedRow({});
                getDataList();
                console.log(selectedRow.title);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            <input type="text" onChange={(e) => setHeader(e.target.value)} />
            <input type="text" onChange={(e) => SetContent(e.target.value)} />
            <button className="Submit" onClick={onSubmit}>Submit</button>

            {dataList.map((data, index) => (
                <div key={index}>
                    <h2 class="mt-3 mb-3">Title: {data.title}</h2>
                    <h4 class="mt-3 mb-3">Description: {data.description}</h4>
                    <li class="mt-3 mb-3">benefits:
                        {data.benefits.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </li>

                    <button onClick={() => onSelectRow(data.id)}>Edit</button>
                </div>
            ))}

            {showModal && (
                <>
                    <div className="loaction_modal">
                        <div className="location_content">
                            <div className="locationmodal_header">
                                <h2>Update the Location</h2>
                                <button type="button" onClick={hideModal} className="close_locationModal">&times;</button>
                            </div>
                            <div>
                                {selectedRow &&
                                    <form className="locationdetails_form" onSubmit={handleSubmit}>
                                        <label for="title">Title</label>
                                        <input
                                            type="text"
                                            className="locationdetails_input"
                                            placeholder="Enter the Title..."
                                            value={selectedRow?.title || ''}
                                            onChange={(e) => setSelectedRow({ ...selectedRow, title: e.target.value })}
                                        />

                                        <label for="id">description</label>
                                        <input
                                            type="text"
                                            className="locationdetails_input"
                                            placeholder="Enter the title..."
                                            value={selectedRow?.description || ''}
                                            onChange={(e) => setSelectedRow({ ...selectedRow, description: e.target.value })}
                                        />

                                        <label for="id">benefits</label>
                                        {/* <input
                                            type="text"
                                            className="locationdetails_input"
                                            placeholder="Enter the title..."
                                            value={selectedRow?.benefits || ""}
                                            onChange={(e) => setSelectedRow({ ...selectedRow, benefits: e.target.value.split(',') })}
                                        /> */}

                
                                                {locationCategory.map((input, index) => (
                                                    <div>
                                                        <input
                                                            key={index}
                                                            className="locationdetails_input"
                                                            value={input.value}
                                                            onChange={(e) => handleChange(e, index)}
                                                            style={{ width: "75%" }}
                                                        />
                                                        <button className="remove_btn" onClick={() => handleRemovePair(index)}>Remove</button>
                                                    </div>
                                                ))}
                                                <input type="button" className="CategoryAdd_Btn" onClick={handleAddField} value="Add Categories" />
                                        {/* <label for="address">Address</label>
                                            <input
                                                type="text"
                                                className="locationdetails_input"
                                                placeholder="Enter the Address..."
                                                value={selectedRow?.address || ''}
                                                onChange={(e) => setSelectedRow({...selectedRow, address: e.target.value})}
                                            /> */}

                                        {/* <label for="category">category</label>
                                            <div>
                                                {locationCategory.map((input, index) => (
                                                    <div key={index}>
                                                        <input
                                                            type="text"
                                                            value={input.value}
                                                            className="locationdetails_input"
                                                            placeholder="Enter the category..."
                                                            onChange={(e) => handleChange(e, index)}
                                                            style={{ width: "75%" }}
                                                        />
                                                        <button className="remove_btn" onClick={() => handleRemovePair(index)}>Remove</button>
                                                    </div>
                                                ))}
                                                <input type="button" className="CategoryAdd_Btn" onClick={handleAddField} value="Add Categories" />
                                            </div> */}

                                        <button className="locationSubmit_Btn" type="submit">Save the data</button>

                                        {/* {loading ? (
                                                <div style={{ textAlign: "center" }}><h4>Updating the data...!!!</h4>
                                                    <img src="../../../assets/Loading.gif" /></div>
                                            ) : (
                                                <button className="locationSubmit_Btn" type="submit">Save the data</button>
                                            )} */}

                                    </form>


                                }
                            </div>
                        </div>
                    </div>
                </>
            )};
        </div>

        // (
        //     <>
        //         <div className="loaction_modal">
        //             <div className="location_content">
        //                 <div className="locationmodal_header">
        //                     <h2>Update the Location</h2>
        //                     <button type="button" onClick={hideModal} className="close_locationModal">&times;</button>
        //                 </div>

        //                 <div className="locationdetails_content">
        //                     <form className="locationdetails_form">

        //                         <label for="title">Title</label>
        //                         <input
        //                             type="text"
        //                             className="locationdetails_input"
        //                             placeholder="Enter the Title..."
        //                             // value={title}
        //                             // onChange={(e) => setTitle(e.target.value)}
        //                         />

        //                         <label for="id">id</label>
        //                         <input
        //                             type="text"
        //                             className="locationdetails_input"
        //                             placeholder="Enter the title..."
        //                             // value={description}
        //                             // onChange={(e) => setDescription(e.target.value)}
        //                         />

        //                         <button className="locationSubmit_Btn" type="submit">Save the data</button>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </>
        // )

    );
}

export default Data1;
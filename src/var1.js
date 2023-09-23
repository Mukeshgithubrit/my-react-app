import React, { useState, useEffect } from "react";
// import './LocationList.css';
import { db, storage } from "../Firebase/Firebase1";
import { getDocs, collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";

function LocationDetails1() {
    const [searchTerm, setSearchTerm] = useState("");
    const [locationDetails, setLocationDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showModal2, setShowModal2] = useState(false);
    const locationDetailsCollectionRef = collection(db, "locationdetails");


    const [selectedRow, setSelectedRow] = useState({});

    //Fetching the data
    const getLocationDetails = async () => {
        try {
            const data = await getDocs(locationDetailsCollectionRef);
            const location = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setLocationDetails(location);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getLocationDetails();
        if (alertMessage !== '') {
            alert(alertMessage);
            setAlertMessage('');
        }
    }, [alertMessage])

    //Modal Data
    const showDetail2 = (id) => {
        setShowModal2(true);
        const userC = records.find((location) => location.id === id);
        setSelectedRow(userC);
    };

    const hideModal2 = () => {
        setShowModal2(false);
    };

    //Searching the data
    const filteredData = locationDetails.filter(location =>
        location.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }

    //Edit the data
    const handleSubmit = async(event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const docRef = doc(db, "locationdetails", selectedRow.id);
            await updateDoc(docRef, {
                title: selectedRow.title,
                address: selectedRow.address,
            })
            setSelectedRow({});
            getLocationDetails();
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="locationlist_container">
                <h4 className="locationheader_list">Location Details</h4>
                <div className="locationHeader_Container">
                    <div>
                        <input
                            type="text number"
                            className="location_search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="location_button">Add Location</button>
                    </div>
                </div>

                <div className="locationtable_container">
                    <table className="locationtable_list">
                        <tr className="locationrow_list" style={{ backgroundColor: "#F4E8D8" }}>
                            <th className="locationtable_head">Title</th>
                            <th className="locationtable_head">Address</th>
                            <th className="locationtable_head">Category</th>
                            <th className="locationtable_head">Status</th>
                            <th className="locationtable_head">Action</th>
                        </tr>
                        {records.map((location) => (
                            <tr className="locationrow_list" key={location.id}>
                                <td className="locationtable_data">{location.title}</td>
                                <td className="locationtable_data">{location.address}</td>
                                <td className="locationtable_data">{location.category[0]}, {location.category[1]}</td>
                                <td><div className="locationdisable_btn">
                                    <input type="checkbox" className="locationtoggle_btn" checked={location.active}/>
                                </div></td>
                                <td><div >
                                    <button className="Details_btn" onClick={() => showDetail2(location.id)}>Edit</button>
                                </div></td>
                            </tr>
                        ))}
                    </table>
                </div>

                <nav className="locationpagination_container">
                    <li>
                        <a href="#" onClick={prePage}>Prev</a>
                    </li>
                    <li>
                        <a href="#" onClick={nextPage}>Next</a>
                    </li>
                </nav>

                {showModal2 && (
                    <>
                        <div className="loaction_modal">
                            <div className="location_content">
                                <div className="locationmodal_header">
                                    <h2>Update the Location</h2>
                                    <button type="button" onClick={hideModal2} className="close_locationModal">&times;</button>
                                </div>

                                <div className="locationdetails_content">
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

                                            {/* <label for="id">Id</label>
                                            <input
                                                type="text"
                                                className="locationdetails_input"
                                                placeholder="Enter the title..."
                                                value={selectedRow?.id || ''}
                                                onChange={(e) => setSelectedRow({ ...selectedRow, id: e.target.value })}
                                            /> */}

                                            <label for="address">Address</label>
                                            <input
                                                type="text"
                                                className="locationdetails_input"
                                                placeholder="Enter the Address..."
                                                value={selectedRow?.address || ''}
                                                onChange={(e) => setSelectedRow({ ...selectedRow, address: e.target.value })}
                                            />

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
        </div>
    );
}

export default LocationDetails1;




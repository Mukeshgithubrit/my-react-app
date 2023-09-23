import React, { useState, useEffect } from 'react';
import './VirtualConsultationList.css';
import { db } from "../../Firebase1";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

function VirtualConsultationList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [consultationList, setConsultationList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [active, setActive] = useState(false);
    const [vid, setVid] = useState(null);
    const consultationListCollectionRef = collection(db, "virtualdetails");

    //Fetching the data
    const getConsultationList = async () => {
        try {
            const data = await getDocs(consultationListCollectionRef);
            const virtual = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setConsultationList(virtual);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getConsultationList();
    }, [])

    //Searching the data
    const filteredData = consultationList.filter(virtual =>
        virtual.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        virtual.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //Modal Data
    const showDetail = (virtualId) => {
        setShowModal(true);
        const selected = filteredData.find((virtual) => virtual.id === virtualId);
        setShowModal(selected);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
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

    //Diable button Modal data
    const handleDiableBooking = async (id, bookingStatus) => {
        setShowModal1(true);
        setVid(id);
        setActive(bookingStatus);
    }

    const handleConfirmModel = async () => {
        const virtualRef = doc(consultationListCollectionRef, vid);
        try {
            await updateDoc(virtualRef, { bookingStatus: !active });
            getConsultationList();
            console.log(virtualRef, { bookingStatus: !active });
            setShowModal1(false);
        } catch (err) {
            console.error(err);
        }
    }

    const handleModalClose = () => {
        setShowModal1(false);
    };
    return (
        <div>
            <div className="virtualconsultation_container">
                <h4 className="virtualconsultation_list">Virtual Consultation List</h4>
                <div style={{ width: "100%" }}>
                    <input
                        type="text number"
                        className="consultationlist_search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="locationtable_container">
                    <table className="consultationtable_list">
                        <tr className="consultationrow_list" style={{ backgroundColor: "#F4E8D8" }}>
                            <th className="consultationtable_head">Name</th>
                            <th className="consultationtable_head">Email</th>
                            <th className="consultationtable_head">Phone</th>
                            <th className="consultationtable_head">Date</th>
                            <th className="consultationtable_head">Booking Status</th>
                            <th className="consultationtable_head">Details</th>
                        </tr>
                        {records.map((virtual) => (
                            <tr className="consultationrow_list" key={virtual.id}>
                                <td className="consultationtable_head">{virtual.userName}</td>
                                <td className="consultationtable_head">{virtual.userEmail}</td>
                                <td className="consultationtable_head">{virtual.userPhone}</td>
                                <td className="consultationtable_head">{virtual.createdAt.toDate().toLocaleDateString()}</td>
                                <td className="consultationtable_head">{virtual.bookingStatus.toString()}</td>
                                <td className="table_data"><button className="showdetails_btn" onClick={() => showDetail(virtual.id)}>Show Details</button></td>
                            </tr>
                        ))}
                    </table>

                    {showModal && (
                        <>
                            <div className="virtual_modal">
                                <div className="virtualmodal_content">
                                    <div className="virtualmodal_header">
                                        <h2>Details</h2>
                                        <button type="button" onClick={hideModal} className="virtualclose_modalbtn">&times;</button>
                                    </div>

                                    <div style={{ overflowX: "auto" }}>
                                        <table className='table-details'>
                                            <tr>
                                                <th className="virtual_details">ConcernArea</th>
                                                <td className="virtual_details">: {showModal.userConcernArea}</td>
                                            </tr>
                                            <tr>
                                                <th className="virtual_details">Concern</th>
                                                <td className="virtual_details">
                                                    {showModal.userConcern.map((value, index) => (
                                                        <li key={index}>{value}</li>
                                                    ))}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="virtual_details">Message</th>
                                                <td className="virtual_details">: {showModal.userMessage}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div className='virtualtoggle-Container'>
                                        <div className="virtualtoggle-content">Checked</div>
                                        <div className="virtualtoggle-switch">
                                            <input type="checkbox" id="toggle1" checked={showModal.bookingStatus} onChange={() => { handleDiableBooking(showModal.id, showModal.bookingStatus); }} />
                                            <label htmlFor="toggle1" />
                                        </div>
                                        <div className="virtualtoggle-content">Not-Checked</div>
                                    </div>

                                    {showModal1 && (
                                        <div className="locationconfirm_modal">
                                            <div className="locationmodal_content">
                                                {active &&
                                                    <h4>Are you sure you want to disable the Booking?</h4>
                                                }
                                                {!active &&
                                                    <h4>Are you sure you want to enable the Booking?</h4>
                                                }
                                                <div className="locationmodal_button">
                                                    <button className="locationmodal_Yes" onClick={() => handleConfirmModel()}>Yes</button>
                                                    <button className="locationmodal_No" onClick={handleModalClose}>No</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>



                <nav className="virtual-pagination">
                    <li>
                        <a href="#" onClick={prePage}>Prev</a>
                    </li>
                    <li>
                        <a href="#" onClick={nextPage}>Next</a>
                    </li>
                </nav>

                <h1 className="text-3xl font-bold underline text-center">
                    Hello world!
                </h1>

                <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                    <div class="text-center space-y-2 sm:text-left">
                        <div class="space-y-0.5">
                            <p class="text-lg text-black font-semibold">
                                Erin Lindford
                            </p>
                            <p class="text-slate-500 font-medium">
                                Product Engineer
                            </p>
                        </div>
                        <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VirtualConsultationList;
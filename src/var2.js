import { useEffect } from "react";
import { useState } from "react";
import { db, auth, storage } from "./Firebase1";
import { collection, addDoc, getDocs, updateDoc, doc, get, update } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function YourComponent() {
    const [dataList, setDataList] = useState([]);
    const [locationCategory, setLocationCategory] = useState("");
    const movieCollectionRef = collection(db, "services5");

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

    const handleAddField = () => {
        const valves = [...locationCategory, ""];
        setLocationCategory(valves);
    };

    const handleFieldChange = (index, value) => {
        const updatedFields = [...locationCategory];
        updatedFields[index] = value;
        setLocationCategory(updatedFields);
    };

    const handleSave = async(event, id) => {
        event.preventDefault()
        if (locationCategory.length > 0) {
            console.log(locationCategory); 
            try {
                const docRef = doc(db, "services5", id);
                await updateDoc(docRef, {
                    data: locationCategory,
                })
                setLocationCategory({});
                getDataList();
            } catch (err) {
                console.error(err);
            }// Do not update Firestore if the array is empty
          }
          
        
        // Perform the save action here without updating the fields state
         // Use the fields data as needed
    };

    return (
        <div>
            {dataList.map((locationCategory) => (
                <div>
                    {locationCategory.data.map((field, index) => (
                        <input
                            key={index}
                            value={field.value}
                            onChange={(e) => handleFieldChange(index, e.target.value)}
                        />
                    ))}
                    
                </div>
                

            ))}
            <button className="CategoryAdd_Btn" onClick={handleAddField}>Add Categories</button>

            <button onClick={handleSave}>Save</button>
        </div>
    );
}


export default YourComponent;

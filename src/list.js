import React, { useState } from 'react';

function MyComponent() {
//   const [data, setData] = useState(['name', 'name1', 'name2']);

//   const handleChange = (index, event) => {
//     const newData = [...data];
//     newData[index] = event.target.value;
//     setData(newData);
//   };
const [dataArray, setDataArray] = useState([""]);

const handleInputChange = (e, index) => {
    const newDataArray = [...dataArray]; // Create a copy of the dataArray
    newDataArray[index] = e.target.value; // Update the value at the specified index
    setDataArray(newDataArray); // Update the state with the modified array
  };

  const addInputField = () => {
    setDataArray([...dataArray, '']);
  };

  const removeInputField = (index) => {
    const newDataArray = [...dataArray];
    newDataArray.splice(index, 1); // Remove the element at the specified index
    setDataArray(newDataArray);
  };

  return (
    <div>
      {/* {data.map((value, index) => (
        <input
          key={index}
          value={value}  
          onChange={(event) => handleChange(index, event)}
        />
      ))} */}
      {dataArray.map((data, index) => (
        <div>
  <input
    key={index}
    value={data}
    onChange={(e) => handleInputChange(e, index)}
  />
  <button onClick={() => removeInputField(index)}>Remove</button>
  </div>
))}

    </div>
  );
}

export default MyComponent;


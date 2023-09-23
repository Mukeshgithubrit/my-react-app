// import React from "react";
// import { useState } from "react";

// function FocalLength() {
//     const [focalLength, setFocalLength] = useState(50); // default focal length of 50mm

//     const [checked, setChecked] = useState(false);

//     const handleCheckboxChange = (event) => {
//         setChecked(event.target.checked);
//     }

//     const [disabled, setDisabled] = useState(true);

//   function handleGameClick() {
//     setDisabled(!disabled);
//   }


//     return (
//         <div>
//             <img src="../../../assets/Bitcare2.png" alt="Before" />
//             <img src="../../../assets/Bitcare2.png" alt="After" />

//             <div style={{ position: 'relative' }}>
//                 <img src="../../../assets/Bitcare2.png" alt="Before" style={{ zIndex: 1 }} />
//                 <img src="../../../assets/Bitcare2.png" alt="After" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, backgroundPosition: 'center', backgroundSize: 'cover', filter: `blur(${focalLength}px)` }} />
//             </div>

//             <input type="range" min="20" max="200" value={focalLength} onChange={(e) => setFocalLength(parseInt(e.target.value))} />

//             <div>
//                 <label>
//                     <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
//                     Enable input box
//                 </label>
//                 {checked && (
//                     <input type="text" placeholder="Enter text" />
//                 )}
//             </div>

//             <div>
//       <input
//         className='typing-container'
//         placeholder=' type here '
//         disabled={disabled}
//       />
//       <button type='submit' onClick={handleGameClick}> Start Game </button>
//     </div>
//         </div>
//     );
// }

// export default FocalLength;

// import React, { useState } from 'react';

// function ImageUpload() {
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const handleImageUpload = (event) => {
//     // Handle the image upload logic and set the uploadedImage state
//     setUploadedImage(event.target.files[0]);
//   }

//   return (
//     <div>
//       <input type="file" onChange={handleImageUpload} />

//       {uploadedImage &&
//         <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Image" />
//       }

//       {/* Render the second image component when the first image is uploaded */}
//       {uploadedImage &&
//         <input type="file" />
//       }
//     </div>
//   );
// }



// import { useState } from 'react';

// function ImageUpload() {
//   const [isDisabled, setIsDisabled] = useState();

//   const handleClick = () => {
//     setIsDisabled(!isDisabled);
//   }

//   return (
//     <div>
//       <input type="text" disabled={isDisabled} title="This field is disabled"/>
//       <button onClick={handleClick}>
//         {isDisabled ? 'Enable' : 'Disable'}
//       </button>
//       <input type="text" aria-disabled={isDisabled} aria-label="This field is disabled."/>
//     </div>
//   );
// }
// export default ImageUpload;

import React from 'react';
import './App1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

function ImageUpload() {
  return (
    <div style={{ display: 'block', width: 700, padding: 30 }}>
      <h4>React-Bootstrap Carousel Component</h4>
      <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
            alt="Image One"
          />

        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
            alt="Image Two"
          />

        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ImageUpload;
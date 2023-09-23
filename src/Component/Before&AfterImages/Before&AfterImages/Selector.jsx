// import React, { useState } from 'react';

// const ImageSelector = () => {
//   const [selections, setSelections] = useState([]);
//   const [selecting, setSelecting] = useState(false);

//   const handleImageClick = (event) => {
//     if (selecting) {
//       const newSelection = {
//         x: event.nativeEvent.offsetX,
//         y: event.nativeEvent.offsetY,
//         width: 50,
//         height: 50,
//       };
//       setSelections([...selections, newSelection]);
//     }
//   };

//   const toggleSelection = () => {
//     setSelecting(!selecting);
//   };

//   return (
//     <div>
//       <img
//         src="../../../assets/image.png"
//         alt="Body Parts"
//         onClick={handleImageClick}
//         style={{ position: 'relative', height: "500px", width: "250px"
//      }}
//       />
//       <button onClick={toggleSelection}>
//         {selecting ? 'Stop Selecting' : 'Start Selecting'}
//       </button>
//       {selections.map((selection, index) => (
//         <div
//           key={index}
//           style={{
//             position: 'absolute',
//             left: selection.x,
//             top: selection.y,
//             width: selection.width,
//             height: selection.height,
//             border: '1px solid red',
//             opacity: 0.5,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default ImageSelector;

import React, { useState } from 'react';
// import './App.css'; // Import your CSS file

function ImageSelector() {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  const handleHover = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    console.log(bodyPart);
  };

  return (
    <div className="App">
      <div className="image-container">
        <img
          src="../../../assets/image.png"
          alt="Body with body parts"
          height="500px" width="250px"
        />
        <div className="body-part-selection"
             onMouseOver={() => handleHover('head')}
             onMouseLeave={() => handleHover('')}>
          {selectedBodyPart === 'head' && <div className="highlight head-highlight" style={{fill: "blue", opacity: "0.5"}}></div>}
        </div>
        {/* Repeat the above pattern for other body parts */}
      </div>
    </div>
  );
}

export default ImageSelector;


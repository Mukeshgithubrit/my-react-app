// import React from "react";
// import './App1.css';

// function App12() {
//     var loadFile1 = function (event) {
//         var image = document.getElementById("output1");
//         image.src = URL.createObjectURL(event.target.files[0]);
//     };

//     var loadFile2 = function (event) {
//         var image = document.getElementById("output2");
//         image.src = URL.createObjectURL(event.target.files[0]);
//     };

//     return (
//             <div>
//                 <h1>Hello World</h1>
//                 <div class="profile-pic">

//                     <div className="container-ggg">
//                         <div className="no">
//                             <img src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg" id="output1" width="340" height="360"/>
//                             <input id="file" type="file" onchange={() => loadFile1.event} />
//                         </div>

//                         <div className="no">
//                             <img src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg" id="output2" width="340" height="360"/>
//                             <input id="file" type="file" onchange={() => loadFile2.event} />
//                         </div>

//                     </div>
//                 </div>

//             </div>
//     );
// }

// export default App12;

// import React, { useState } from 'react';
// import './App1.css';

// const ImageComparisonSlider = () => {
//   const [sliderPosition, setSliderPosition] = useState(50);

//   const handleSliderChange = (event) => {
//     setSliderPosition(event.target.value);
//   };

//   return (
//     <div className="container_Slider">
//       <img
//         className="image"
//         src="/path/to/first-image.jpg"
//         alt="First Image"
//         style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
//       />
//       <input
//         type="range"
//         className="slider"
//         min="0"
//         max="100"
//         value={sliderPosition}
//         onChange={handleSliderChange}
//       />
//       <img
//         className="image"
//         src="/path/to/second-image.jpg"
//         alt="Second Image"
//       />
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className="App">
//       <ImageComparisonSlider />
//     </div>
//   );
// }

// export default App;
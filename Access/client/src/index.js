
import React from 'react';
import ReactDOM from 'react-dom/client';
import ExamPage from './ExamPage';
import App from './JWT/App';
import BiodataRegistration from './BiodataRegistration';
import ENTIRAN from './ENTIRAN';

const APP = () => {
    return <ENTIRAN />
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<APP />)
// import React, { useState } from "react";
// import Home from "./CommandLine/Home";
// import Resume from "./CommandLine/Resume";
// import Profile from "./CommandLine/Profile";

// function App() {
//     const [command, setCommand] = useState("");

//     const renderPage = () => {
//         switch (command.toLowerCase()) {
//             case "resume":
//                 return <Resume />;
//             case "profile":
//                 return <Profile />;
//             default:
//                 return <Home setCommand={setCommand} />;
//         }
//     };

//     return (
//         <div className="bg-gray-900 text-white h-screen flex justify-center items-center">
//             {renderPage()}
//         </div>
//     );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />)

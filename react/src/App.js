import React, { Children, createContext } from "react";
import { Route, Router, Routes } from "react-router-dom";

import StudentHomePage from "./Component/StudentHomePageComponent";
import HeaderBar from "./Component/HeaderBarComponent";
import StudentVideos from "./Component/StudentVideosPageComponent";
import ScorePage from "./Component/ScorepageComponent";
import QuizHistory from "./Component/QuizHistoryComponent";
import CreateQuiz from "./Component/CreateQuizComponent";
import TeacherHomePage from "./Component/TeacherHomePageComponent";
import CreateVideo from "./Component/CreateVideoQuizComponent";
import TeacherVideos from "./Component/TeacherVideosPageComponent";
import AccountPage from "./Component/AccountpageComponent";
import EditAccount from "./Component/EditAccountComponent";
import StudentScorePage from "./Component/StudentScorepageComponent";
import EditVideo from "./Component/EditVideoQuizComponent";
import LoginPage from "./Component/LoginPageComponent";
import CreateAccountPage from "./Component/CreateAccountPageComponent";

import DataProvider, { DataStudentsProvider,DataSubjectsProvider } from "./Storage/DataProvider"

import './Component/Styles/ControlVideoStyle.css'

import axios from "axios"
import { useEffect,useState } from "react";
import Id from "./Component/context/Count";
import { Context } from "./Context";
import NewVideoPlayer from "./Component/VideoPlayerComponent";
import VideoPlayer from "./Component/VideoPlayerComponent";

// const DataStudentsContext = createContext();

// function DataStudentsProvider({children}){
//   const [students,setStudents] = useState();
//   useEffect(()=>{
//     axios.get(`https://vel063.comsciproject.net/api/user.php`).then(response => response.data)
//       .then((data)=>{
//         setStudents(data);
//       });
//   },[])
//   return (
//     <DataStudentsContext.Provider value={{students,setStudents}}>
//       {children}
//     </DataStudentsContext.Provider>
//   )
// }

function DataStudentsContent() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/CreateAccountPage" element={<CreateAccountPage/>}/>
      <Route path="/teacherHomepage" element={<div><HeaderBar/><TeacherHomePage/></div>}/>
      <Route path="/createVideoQuiz" element={<div><HeaderBar/><CreateVideo/></div>}/>
      <Route path="/editVideoQuiz" element={<div><HeaderBar/><EditVideo/></div>}/>
      <Route path="/videos" element={<div><HeaderBar/><StudentVideos/></div>}/>
      <Route path="/videosTeacher" element={<div><HeaderBar/><TeacherVideos/></div>}/>
      <Route path="/AccountPage" element={<div><HeaderBar/><AccountPage/></div>}/>
      <Route path="/EditAccount" element={<div><HeaderBar/><EditAccount/></div>}/>
      <Route path="/StudentScore" element={<div><HeaderBar/><StudentScorePage/></div>}/>
      <Route path="/Score" element={<div><HeaderBar/><ScorePage/></div>}/>
      <Route path="/QuizHistory" element={<div><HeaderBar/><QuizHistory/></div>}/>
      <Route path="/CreateQuiz" element={<div><HeaderBar/><CreateQuiz/></div>}/>
      <Route path="/videoplayer" element={<div><HeaderBar/><NewVideoPlayer/></div>}/>
      <Route path="/studentHomepage" element={<div><HeaderBar/><StudentHomePage/></div>}/>
      <Route path="/VideoPlayerpage" element={<div><HeaderBar/><VideoPlayer/></div>}/>
    </Routes>
  );
}

function App() {
  return (
    <DataSubjectsProvider>
      <DataStudentsProvider>
        <DataStudentsContent></DataStudentsContent>
      </DataStudentsProvider>
    </DataSubjectsProvider>
    
  );
}

// export { DataStudentsContext };
export default App;

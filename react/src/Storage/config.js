// config.js
const config ={
  teacherRole: 1,
  studentRole: 0,

  questTypeMutiple: true,//1
  questTypeShortAns: false,//0
  GetQuestType: {
    Mutiple: 1,
    SHortAns: 0,
  },

  subjectOption: [
    'Edit', 
    'Delete',
    'add Student',
    'Delete Student'
  ],
  VideoType: {
    CantFast: 1,
    NormalVideo:0,
  },
  StudentVideoStatus:{
    NotWatched:0,
    Watching:1,
    Watched:2
  },
  
  
  //path
  loginPage: '/',
  teacherHomepage: '/teacherHomepage',
  studentHomepage: '/studentHomepage',
  createAccountPage: '/CreateAccountPage',
  AccountPage: '/AccountPage',
  EditAccountPage: '/EditAccount',
  VideosPage: '/videos',
  videoplayerPage: '/videoplayer',
  studentScorePage: '/StudentScore',
  createVideoQuizPage: '/createVideoQuiz',
  TeacherScorePage: '/Score',
  EditVideoQuizPage: '/editVideoQuiz',
}
export default config;
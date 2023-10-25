const hostname = window.location.hostname;
const Servicesconfig = {
    getAllStudents: `/user.php`,
    getAllSubjects: `/subject.php/`,
    postCheckLogin: `/user.php/Login`,
    postCreateAccount: `/user.php/createUser`,
    postUploadUserImage: `/upuser.php/`,
    postUploadQuestImage: `/upload.php/`,
    postCreateSubject: `/subject.php/insertSubject`,
    postEditSubject: `/subject.php/setSubject/`,
    DeleteSubject: `/subject.php/`,
    getRequestStudent: `/studentREQUEST.php/getSTRQ/`,
    getAllStudentsInClass: `/user.php/check/`,
    postInsertStudentInsubject: `/studentSUBJECT.php/postSTsubject`,
    DeleteSubjectInstudentRequest: `/studentREQUEST.php/`,
    DeleteStudentInClass: `/studentSUBJECT.php/`,
    postInsertStudentInRequest: `/studentREQUEST.php/Request/`,
    getImageProfile: `http://`+hostname+`:8080/users/`,
    getImageQuest: `http://`+hostname+`:8080/uploads/`,
    getStudentSubject: `/studentSUBJECT.php/getStudentSJ/`,
    getvideo: `/studentASSIGNMENT.php/teacherGetAssignment/`,
    deleteVideo: `/video.php/`,
    changeTypeVideo: `/video.php/setType/`,
    getUser: `/user.php/`,
    editUser: `/user.php/edituser`,
    getAssigmentOnVideo: `/studentANSWER.php/videoAssignment/`,
    postStudentAssigmentForm: `/studentANSWER.php/getForm/`,
    postUpdateCurrentTime: `/studentEVIDEO.php/updateCurrent`,
    postCreateCurrentTime: `/studentEVIDEO.php/postStatus`,
    getVideoInfo: `/video.php/getVinfo/`,
    postUpdateMyAnswer: `/studentANSWER.php/updateAnswer`,
    getStudentAssigment: `/studentASSIGNMENT.php/getStudentAssigment/`,
    postCreateStudentAssignment: `/studentASSIGNMENT.php/PostAssignment`,
    postUpdateStudentAssignment: `/studentASSIGNMENT.php/setAnswer`,
    getAssignments: `/assignment.php/getvideoassignment/`,
    getStudentScore: `/studentASSIGNMENT.php/getAllStudentAssigment/`,
    getQuestions: `/studentASSIGNMENT.php/getQuestion/`,
    deleteQuiz: `/assignment.php/`,
    postUpdateVideoQuiz: `/video.php/updateVideo/`,
    getVideoDataEdit:`/video.php/allcontent/`,
    deleteQuestion: `/question.php/`,
    postVideoQuiz: `/video.php/insertVideo/`,
    updatePassword: `/user.php/editpassword`,
    getAssignmentScore:`/studentASSIGNMENT.php/getAssignment/`,
  };
  export default Servicesconfig;
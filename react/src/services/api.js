import axios from 'axios';
import Servicesconfig from '../Storage/servicesConfig';
import config from '../Storage/config';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  // Other configuration options
});

// get
// login
export const fetchUserData = async () => {
  try {
    const response = await api.get(`/user.php`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// StudentHomePage
export const getsubjects = async (Sid) => {
  try {
    const allSubject = await api.get(`/subject.php`);
    const SubjectStudent = await api.get(`/studentSUBJECT.php/getStudentSJ/${Sid}`);
    console.log('allSubject: ',allSubject.data);
    console.log('SubjectStudent: ',SubjectStudent.data);
    if(SubjectStudent.data.length !== undefined){
      const Response = allSubject.data.filter((subject)=>{
        console.log('Subject: ',subject);
        return !SubjectStudent.data.some((studentSubject)=> studentSubject.SJid === subject.SJid);
      })
      // const newArray = allSubject.data.filter(item1 => SubjectStudent.data.some(item2=> item2.SJid !== item1.SJid));

      return Response;
    }else{
      return allSubject.data
    }
  } catch (error) {
    throw error;
  }
};

// get
// StudentHomePage
// TeacherHomePage
export const getAllsubjects = async () => {
  try {
    const response = await api.get(`/subject.php`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// StudentHomePage
export const getRequestsubjects = async (Sid) => {
  try {
    const response = await api.get(`/studentREQUEST.php/getAllRQ/${Sid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// StudentVideosPage
export const getStudentvideos = async (SJid,Sid) => {
  try {
    const response = await api.get(`/studentEVIDEO.php/getSTvideo/${SJid}/${Sid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// StudentVideosPage
// TeacherVideosPage
export const getvideos = async () => {
  try {
    const response = await api.get(`/video.php`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// Accountpage
export const getUser = async (Uid) => {
  try {
    const response = await api.get(Servicesconfig.getUser+Uid);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// CardVideos
export const getAssignment = async (Vid,Sid) => {
  try {
    const response = await api.get(`/studentASSIGNMENT.php/getAssignment/${Vid}/${Sid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// DialogAddStudent
// DialogDeleteStudent
export const getUsercheck = async (SJid) => {
  try {
    const response = await api.post(`/user.php/check/${SJid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// DialogAddStudent
// DialogDeleteStudent
export const getAllusers = async () => {
  try {
    const response = await api.get(Servicesconfig.getAllStudents);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get
// DialogAddStudent
// DialogDeleteStudent
export const getStudentRequest = async (SJid) => {
  try {
    const response = await api.get(Servicesconfig.getRequestStudent + SJid);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LoginCheck = async (formData) => {
  try{
    const response = await api.post(Servicesconfig.postCheckLogin, {
      Uid: formData.userID,
      password: formData.password,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const CreateAccount = async (formData) => {
  try{
    let picName = undefined;
    if(formData.Pic !== undefined){
      const typefile = formData.Pic[0].name.substr(formData.Pic[0].name.length - 4);
      let rand = Math.floor(Math.random()* 10000);
      picName = rand.toString()+'-'+formData.userID+typefile;
      const ImageData = ({
        fileImg: formData.Pic,
        ImgName: picName,
      });
      const responseUpload = await UploadUserImg(ImageData);
      console.log('PIC: ',responseUpload);
    }

    const response = await api.post(Servicesconfig.postCreateAccount, {
      Uid: formData.userID,
      name: formData.Fname+' '+formData.Lname,
      password: formData.password,
      User_PIC: picName,
    });
    return response;
  }catch (error) {
    throw error;
  }
};

export const UploadUserImg = async (ImageData) => {
  try{
    const formData = new FormData();
    formData.append('avatar',ImageData.fileImg[0]);

    const response = await api.post(Servicesconfig.postUploadUserImage + ImageData.ImgName,formData,{
      headers:{
        'content-type': 'multipart/form-data'
      }
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const UploadQuestImg = async (ImageData,ImgName) => {
  try{
    const response = await api.post(Servicesconfig.postUploadQuestImage + ImgName,ImageData,{
      headers:{
        'content-type': 'multipart/form-data'
      }
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const getSubjects = async () => {
  try{
    const response = await api.get(Servicesconfig.getAllSubjects);
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const getSubject = async (SjId) => {
  try{
    console.log('GetSubject!!!: ',SjId);
    const response = await api.get(Servicesconfig.getAllSubjects+SjId);
    console.log('GetSubject!!!: ',response.data);
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const CreateSubject = async (formSubjectData) => {
  try{
    const response = await api.post(Servicesconfig.postCreateSubject, {
      sjid: formSubjectData.TFsubjectID,
      name: formSubjectData.TFsubjectName,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const EditSubject = async (formSubjectData) => {
  try{
    const response = await api.post(Servicesconfig.postEditSubject + formSubjectData.oldSubjectId, {
      sjid: formSubjectData.subjectIdTF,
      name: formSubjectData.subjectNameTF,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const DeleteSubject = async (SubjectId) => {
  try{
    const response = await api.delete(Servicesconfig.DeleteSubject + SubjectId);
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const getAllusersInClass = async (SJid) => {
  try {
    const response = await api.get(Servicesconfig.getAllStudentsInClass+ SJid);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddstudentSubject = async (Sid,SJid) => {
  try{
    const response = await api.post(Servicesconfig.postInsertStudentInsubject, {
      Sid: Sid,
      SJid: SJid,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const DeletestudentInRequest = async (Sid,SJid) => {
  try{
    const response = await api.delete(Servicesconfig.DeleteSubjectInstudentRequest+Sid+'/'+SJid);
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const DeletestudentInSubject = async (Sid,SJid) => {
  try{
    const response = await api.delete(Servicesconfig.DeleteStudentInClass+SJid+'/'+Sid);
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const AddstudentInRequest = async (Sid,SJid) => {
  try{
    const response = await api.post(Servicesconfig.postInsertStudentInRequest+Sid+'/'+SJid);
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const getsubjectsStudent = async (Sid) => {
  try {
    const SubjectStudent = await api.get(Servicesconfig.getStudentSubject+Sid);
    return SubjectStudent.data;
  } catch (error) {
    throw error;
  }
};

export const getvideo = async (Vid) => {
  try {
    const video = await api.get(Servicesconfig.getvideo+Vid);
    return video.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteVideo = async (Vid) => {
  try{
    const response = await api.delete(Servicesconfig.deleteVideo+Vid);
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const ChangeStatusVideo = async (Vid,VideoType) => {
  try{
    const VideoStatus = config.VideoType
    const type = VideoType===VideoStatus.CantFast?
      VideoStatus.NormalVideo:
      VideoStatus.CantFast;
    console.log('TypeApi: ',type);
    const response = await api.post(Servicesconfig.changeTypeVideo + Vid, {
      Vtype: type
    });
    return type;
  }catch (error) {
    throw error;
  }
};

export const EditUser = async (Uid,UserData,ImgName) => {
  try{
    const response = await api.post(Servicesconfig.editUser + Uid, {
      Uid: UserData.stdId,
      Mypassword: UserData.stdPassword,
      password:UserData.stdNewPassword,
      name:UserData.stdName,
      User_PIC: ImgName,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const EditUserImg = async (ImageData,ImgName) => {
  try{
    const formData = new FormData();
    formData.append('avatar',ImageData[0]);
    const response = await api.post(Servicesconfig.postUploadUserImage + ImgName,formData,{
      headers:{
        'content-type': 'multipart/form-data'
      }
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const getAssigmentOnVideo = async (Vid,StId) => {
  try {
    const SubjectStudent = await api.get(Servicesconfig.getAssigmentOnVideo+Vid+'/'+StId);
    return SubjectStudent.data;
  } catch (error) {
    throw error;
  }
};

export const postAssigmentStudentForm = async (VId,Stid) => {
  try{
    const response = await api.post(Servicesconfig.postStudentAssigmentForm, {
      Vid: parseInt(VId),
      Sid: parseInt(Stid),
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};

export const postUpdateVideoCurrentTime = async (VId,Stid,currentTime,status) => {
  try{
    const response = await api.post(Servicesconfig.postUpdateCurrentTime, {
      Vid: VId,
      Sid: Stid,
      current: currentTime,
      Status: status.toString(),
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const postCreateVideoCurrentTime = async (VId,Stid,status) => {
  try{
    const response = await api.post(Servicesconfig.postCreateCurrentTime, {
      Sid: Stid,
      Vid: VId,
      Status: status.toString(),
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const getVideoInfoData = async (Vid) => {
  try {
    const VideoInfoData = await api.get(Servicesconfig.getVideoInfo+Vid);
    return VideoInfoData.data;
  } catch (error) {
    throw error;
  }
};
export const postUpdateMyAnswerStudent = async (Ansid,MyAns) => {
  try{
    const response = await api.post(Servicesconfig.postUpdateMyAnswer, {
      AWid: Ansid,
      SAnswer: MyAns,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const getAssignmentStudent = async (Aid,Sid) => {
  try {
    const VideoInfoData = await api.get(Servicesconfig.getStudentAssigment+Aid+'/'+Sid);
    return VideoInfoData.data;
  } catch (error) {
    return null
  }
};
export const postCreateStudentAssignment = async (Sid,Aid,Score) => {
  try{
    const response = await api.post(Servicesconfig.postCreateStudentAssignment, {
      Sid: Sid.toString(),
      Aid: parseInt(Aid),
      score: Score,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const postUpdateStudentAssignment = async (Sid,Aid,Score) => {
  try{
    const response = await api.post(Servicesconfig.postUpdateStudentAssignment, {
      Sid: Sid.toString(),
      Aid: parseInt(Aid),
      score: Score,
    });
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const getFullScore = async (Vid) => {
  try {
    const Assignments = await api.get(Servicesconfig.getAssignments+Vid);
    return Assignments.data;
  } catch (error) {
    return null
  }
};
export const getStudentScore = async (Aid) => {
  try {
    const Assignments = await api.get(Servicesconfig.getStudentScore+Aid);
    return Assignments.data;
  } catch (error) {
    return null
  }
};
export const GetQuestions = async (Aid,Uid) => {
  try {
    const Assignments = await api.get(Servicesconfig.getQuestions+Aid+'/'+Uid);
    return Assignments.data;
  } catch (error) {
    return null
  }
};
export const DeleteQuiz = async (QuizId) => {
  try{
    const response = await api.delete(Servicesconfig.deleteQuiz + QuizId);
    return response.data;
  }catch (error) {
    throw error;
  }
};
export const postUpdateVideoQuiz = async (Vid,JsonData) => {
  try{
    const response = await api.post(Servicesconfig.postUpdateVideoQuiz+Vid, JsonData);
    return response.data;
  }catch (error) {
    throw error;
  }
};
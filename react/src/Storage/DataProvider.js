import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Servicesconfig from "./servicesConfig";


const DataStudentsContext = createContext();
const DataSubjectsContext = createContext();

//Get all User from Database
const DataStudentsProvider = ({children})=>{
    const [students,setStudents] = useState();
    useEffect(()=>{
      axios.get(Servicesconfig.getAllStudents).then(response => response.data)
        .then((data)=>{
          setStudents(data);
        });
    },[])
    return (
      <DataStudentsContext.Provider value={{students,setStudents}}>
        {children}
      </DataStudentsContext.Provider>
    )
  }
  
  //Get all Subjects in class from Database
  const DataSubjectsProvider = ({children})=>{
    const [subjects,setSubjects] = useState([]);
    useEffect(()=>{
        getsubjects();
    },[])
    async function getsubjects(){
        await axios.get(Servicesconfig.getAllSubjects).then(response => response.data)
        .then((data)=>{
          setSubjects([...data])
        })
        // console.log('values :'+subjects[0].SJid);
    }
    return (
      <DataSubjectsContext.Provider value={{subjects,setSubjects}}>
        {children}
      </DataSubjectsContext.Provider>
    )
  }

  
  export { DataStudentsContext, DataStudentsProvider
    ,DataSubjectsContext,DataSubjectsProvider };
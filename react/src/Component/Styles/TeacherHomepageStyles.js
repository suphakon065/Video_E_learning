import { indigo, red } from "@mui/material/colors";


export const TeacherHomeBoxStyles = {
    flexDirection: 'column',
    maxWidth: 400,
    height: 47,
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    padding: 2,
    margin: 1,
    borderRadius: 2,
    boxShadow: '1px 1px 5px #ccc',
    color: indigo[900],
    bgcolor: indigo[100],
    border: '1px dashed',
    ":hover": {
        boxShadow: '5px 5px 10px #ccc',
    },
    cursor: 'pointer'
};

export const TeacherHomeGridErrorStyles = {
    justifyContent: 'center'
};

export const TeacherHomeDialogSubjectStyles = {
    width:{
        xs: 180, 
        sm: 450, 
        md: 450, 
        lg: 450, 
        xl: 450
    }
};

export const TeacherHomeTypographyDialogSubjectStyles = {
    paddingBottom:3,
    paddingTop:3,
    paddingLeft:2,
    fontWeight: 'bold',
    color: indigo[900]
};

export const TeacherHomeTypographyAddSubjectStyles = {
    color: indigo[900]
};

export const TeacherHomeTypographyErrorStyles = {
    color: red[900]
};

export const TeacherHomeTextFieldIDStyles = {
    borderRadius:10
};

export const TeacherHomeTextFieldNameStyles = {
    paddingTop:2,
    borderRadius:10,
    paddingBottom:2
};

export const TeacherHomeAddIconeStyles = {
    color: indigo[900], 
    fontSize: 35
};

export const TeacherHomeCancleStyles = {
    color: 'red'
};

export const TeacherHomeCreateStyles = {
    color: 'green'
};
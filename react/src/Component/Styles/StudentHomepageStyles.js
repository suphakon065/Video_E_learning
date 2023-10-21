import { indigo, red } from "@mui/material/colors";


export const StudentHomeBoxStyles = {
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

export const StudentHomeTypographyRequestStyles = {
    color: indigo[900]
};

export const StudentHomeAddIconeStyles = {
    color: indigo[900], 
    fontSize: 35
};
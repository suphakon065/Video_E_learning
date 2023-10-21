import { indigo, red } from "@mui/material/colors";


export const CardSubjectBoxStyles = {
    flexDirection: 'column',
    maxWidth: 400,
    alignItems: 'center', 
    justifyContent: "center",
    padding: 2,
    margin: 1,
    borderRadius: 2,
    boxShadow: '1px 1px 5px #ccc'
};

export const CardSubjectGridSubjectTitleStyles = {
    flexDirection: 'column'
};

export const CardSubjectGridSubjectNameStyles = {
    paddingLeft: 0.5
};

export const CardSubjectTypographySubjectNameStyles = {
    textAlign: "left",
    color: indigo[900],
    overflow: 'hidden', 
    whiteSpace: 'nowrap', 
    textOverflow: 'ellipsis', 
    maxWidth: {
        xs: '80%',
        sm: '70%',
        md: '80%',
        lg: '100%',
        xl: '100%',
    } 
};
export const CardSubjectLinkSubjectStyles = {
    textDecoration: 'none'
};

export const CardSubjectAvatarStyles = {
    bgcolor: indigo[900]
};

export const CardSubjectBoldTextStyles = {
    color: indigo[900], 
    fontWeight: "bold"
};
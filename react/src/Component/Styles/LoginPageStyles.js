import { indigo, red } from "@mui/material/colors";



export const loginBoxStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: 15,
    padding: 3,
    borderRadius: 5,
    boxShadow: '5px 5px 10px #ccc',
    maxWidth: {
      xs: 250,
      sm: 350,
      md: 400,
      lg: 400,
      xl: 400,
    },
    ":hover": {
      boxShadow: '10px 10px 20px #ccc',
    },
};
export const loginHeadTypographyStyles = {
    fontSize:{
        xs: "h3",
        sm: "h3",
        md: "h2",
        lg: "h2",
        xl: "h2",
    },
    padding:3, 
    textAlign:"center",
    color:"#1A2B97",
}
export const loginFormControlStyles = {
    m: 1,
    width:{
        xs: 250,
        sm: 350,
        md: 400,
        lg: 400,
        xl: 400,
    },
    variant:"outlined"
}
export const loginOutlinedInputStyles = {
    borderRadius:10,
    height:'40px',
    marginLeft:2,
    marginRight:2
}
export const loginErrorTextGridStyles = {
    paddingTop:1,
    justifyContent:'center',
}
export const loginErrorTypographyStyles = {
    variant:"caption",
    color:red[900],
}
export const loginButtonSubmitStyles = {
    variant:"contained",
    borderRadius: '30px',
    textDecoration:'none',
    textAlign:"center",
    marginLeft:3,
    bgcolor: indigo[900],
    color: indigo[50],
    marginTop: {
        xs: 2,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
    },
    width:{
        xs: 220,
        sm: 320,
        md: 370,
        lg: 370,
        xl: 370,
    },
    ":hover": {
        bgcolor: indigo[800],
      },
}
export const loginLinkCreateAccStyles = {
    marginTop: 2,
    marginLeft: 4,
}


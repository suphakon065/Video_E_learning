import { indigo,red} from "@mui/material/colors";

export const CreateAccountBoxStyles = {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: "center", 
    margin: 'auto', 
    marginTop: 15, 
    padding: 3,
    borderRadius: 5,
    boxShadow: '5px 5px 10px #ccc',
    maxWidth:{
        xs: 250,
        sm: 350,
        md: 400,
        lg: 400,
        xl: 400,
    },
    ":hover":{
        boxShadow:'10px 10px 20px #ccc'
    }
                
};

export const CreateAccountHeadTypographyStyles = {
    fontSize: {
        xs: "h3",
        sm: "h3",
        md: "h2",
        lg: "h2",
        xl: "h2",
    },
    variant: "h3",
    padding: 2,
    textAlign: "center",
    color: "#1A2B97"
};

export const CreateAccountErrorTypographyStyles = {
    color: red[900]
}

export const CreateAccountTypographySIGN_UPButtonStyles = {
    color: indigo[50]
}

export const CreateAccountSignInStyles = {
    paddingBottom:2
}

export const CreateAccountGridAvatarStyles = {
    justifyContent: 'center',
    paddingBottom: 2
}
export const CreateAccountGridOutlinedInputStyles = {
    paddingBottom: 1
}

export const CreateAccountGridOutlinedNameInputStyles = {
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1
}

export const CreateAccountGridErrorStyles = {
    justifyContent: "center"
}

export const CreateAccountDivStyles = {
    position: 'relative', 
    display: 'inline-block'
}

export const CreateAccountFormControlOutlinedInputStyles = {
    m: 1, width:{
        xs: 250,
        sm: 350,
        md: 400,
        lg: 400,
        xl: 400,
    },
    variant:"outlined"
}

export const CreateAccountFormControlOutlinedNameInputStyles = {
    variant:"outlined"
}

export const CreateAccountOutlinedInputStyles = {
    borderRadius:10,
    height:'40px'
}

export const CreateAccountOutlinedFirstNameInputStyles = {
    borderTopLeftRadius:30,
    borderBottomLeftRadius:30,
    height:'40px'
}

export const CreateAccountOutlinedLastNameInputStyles = {
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    height:'40px'
}

export const CreateAccountInputAdornmentStyles = {
    position: "end"
}

export const CreateAccountIconButtonStyles = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: indigo[900],
    borderRadius: '50%',
    padding: '10px',
}

export const CreateAccountAddPhotoAlternateIconStyles = {
    fontSize: '18px',
    color: 'white',
}

export const CreateAccountEditIconStyles = {
    fontSize: '18px',
    color: 'white',
}

export const CreateAccountSIGN_UPButtonStyles = {
    marginTop: 1, 
    borderRadius: '30px',
    textDecoration:'none',
    textAlign:"center",
    marginLeft:1,
    width:{
        xs: 250,
        sm: 350,
        md: 400,
        lg: 400,
        xl: 400,
    },
    bgcolor: indigo[900],
    color: indigo[50],
    variant:"contained"
}

export const CreateAccountAvatarStyles = {
    width: 150,
    height: 150,
}

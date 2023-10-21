import { indigo,red} from "@mui/material/colors";

export const EditAccountBoxStyles = {
    display: 'flex' ,
    flexDirection: 'column',
    maxWidth:{
        xs:300,
        sm:400,
        lg:350,
        md:400
    },
    margin:'auto',
    marginTop: 15,
    padding: 3,
    borderRadius: 5,
    boxShadow: '5px 5px 10px #ccc',
    ":hover":{
        boxShadow:'10px 10px 20px #ccc'
    }
}

export const EditAccountGridAllContentStyles = {
    paddingLeft: 3
}

export const EditAccountGridHeadStyles = {
    flexDirection: 'row'
}

export const EditAccountGridIDStyles = {
    paddingleft: 3, 
    paddingBottom: 2, 
    paddingRight: 5
}

export const EditAccountGridsubtltleStyles = {
    paddingTop: 3
}


export const EditAccountGridNameStyles = {
    paddingleft: 3, 
    paddingBottom: 2, 
    paddingRight: 5
}

export const EditAccountGridPasswordStyles = {
    paddingleft: 3,
    paddingBottom: 2
}

export const EditAccountGridNewPasswordStyles = {
    paddingleft: 2,
    paddingBottom: 2
}

export const EditAccountGridMidSpaceStyles = {
    paddingLeft: 2.5
}

export const EditAccountGridButtonStyles = {
    paddingleft: 3,
    paddingBottom: 2,
    alignItems: 'left', 
    justifyContent: "flex-end"
}

export const EditAccountTypographyTitleStyles = {
    paddingBottom: 5, 
    textAlign: "left"
}

export const EditAccountTypographySubtitleStyles = {
    fontWeight: 'bold',
    textAlign: "left"
}

export const EditAccountTypographyBlankStyles = {
    textAlign:"left"
}

export const EditAccountFormControlPasswordStyles = {
    m: 1
}

export const EditAccountAvatarStyles = {
    width: 100, 
    height: 100
}

export const EditAccountButtonStyles = {
    borderRadius: '30px',
    textDecoration:'none',
    padding:1.5,
    paddingRight:2,
    textAlign:"center",
    bgcolor: indigo[900]
}

export const EditAccountSaveIconStyles = {
    paddingRight: 2
}

export const EditAccountInputAdornmentStyles = {
    borderRadius:10
}
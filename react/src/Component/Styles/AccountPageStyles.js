import { indigo,red} from "@mui/material/colors";

export const AccountBoxStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth:{
        xs:300,
        sm:350,
        lg:400,
        md:400
    },
    margin: 'auto', 
    marginTop: 15, 
    padding: 3,
    borderRadius: 5,
    boxShadow: '5px 5px 10px #ccc',
    ":hover":{
        boxShadow:'10px 10px 20px #ccc'
    }
            
}

export const AccountGridStyles = {
    paddingLeft: 5
}

export const AccountGridButtonStyles = {
    paddingTop: 3, 
    paddingleft: 3, 
    paddingBottom: 2, 
    alignItems: 'left', 
    justifyContent: "flex-end"
}

export const AccountTypographyTitleStyles = {
    paddingBottom: 5, 
    textAlign: "left"
}

export const AccountTypographySubTitleStyles = {
    fontWeight: 'bold', 
    textAlign: "left"
}

export const AccountAvatarStyles = {
    width: 100, 
    height: 100
}

export const AccountButtonStyles = {
    marginTop: 3, 
    borderRadius: '30px',
    padding:1.5,
    paddingRight:2,
    textDecoration:'none',
    bgcolor: indigo[900]
}

export const AccountTypographyTextStyles = {
    textAlign: "left"
}

import { grey, indigo } from "@mui/material/colors";


export const TeacherCardVideosStyles = {
    maxWidth:{xs:300, sm:330, md:330, lg: 330, xl: 345},
    bgcolor: grey[50] 
}

export const TeacherCardVideosCoverStyles = {
        '&:hover, &:focus-within': {
          opacity: 1,
        },
        opacity: 0,
        transition: '0.1s ease-in'
}

export const TeacherCardVideosTypographyTitleStyles = {
    color: indigo[900]
}

export const TeacherCardVideosDescriptionStyles = {
    overflowY: 'auto',
    wordWrap: 'break-word',
    background: 'transparent',
}

export const TeacherCardVideosTextStyles = {
    color: grey[600],
}

export const TeacherCardVideosStatusStyles = {
    textAlign: "left", 
    padding: 1,
    color: indigo[600]
}

export const TeacherCardVideosRedioStyles = {
    direction: 'column'
}

export const TeacherCardVideosLinkStyles = {
    textDecoration: 'none' 
}

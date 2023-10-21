import { indigo, grey, lightBlue, green } from "@mui/material/colors";


export const CardVideosTypographyGutterBottomStyles = {
    color: indigo[900]
}

export const CardVideosCardStyles = {
    maxWidth: 345 
}

export const CardVideosLinkStyles = {
    textDecoration: 'none'
}

export const CardVideosCoverStyles = {
    '&:hover, &:focus-within': {
        opacity: 1,
    },
    opacity: 0,
    transition: '0.1s ease-in'
}

export const CardVideosPaperStyles = {
    maxHeight: 75, 
    overflow: 'hidden', 
    overflowY:'scroll'
}

export const CardVideosButtonStyles = {
    color: indigo[900]
}

export const CardVideosStatusStyles = {
    paddingLeft: 19
}

export const CardVideosStatusNotYetStyles = {
    color: grey[600]
}

export const CardVideosStatusAlreadyStyles = {
    color: lightBlue[600]
}

export const CardVideosStatusDoneStyles = {
    color: green[600]
}
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { indigo, red } from "@mui/material/colors";
import {
  Button,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import "./Styles/ControlVideoStyle.css";
import DialogDeleteStudent from "./DialogDeleteStudent";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ClassIcon from "@mui/icons-material/Class";

import { Box } from "@mui/system";
import { DeleteSubject, EditSubject } from "../services/api";
import DialogInsetStudent from "./DialogInsertStudent";
import { CardSubjectTeacherAvatarStyles, CardSubjectTeacherBoldTextStyles, CardSubjectTeacherBoxStyles, CardSubjectTeacherCancleStyles, CardSubjectTeacherDialogSubjectStyles, CardSubjectTeacherErrorStyles, CardSubjectTeacherGridDeleteSubjectStyles, CardSubjectTeacherGridSubjectNameStyles, CardSubjectTeacherGridSubjectTitleStyles, CardSubjectTeacherIconButtonStyles, CardSubjectTeacherLinkSubjectStyles, CardSubjectTeacherMenuIconStyles, CardSubjectTeacherMenuStyles, CardSubjectTeacherText2Styles, CardSubjectTeacherTextFieldIDStyles, CardSubjectTeacherTextFieldNameStyles, CardSubjectTeacherTextStyles, CardSubjectTeacherTypographyDialogSubjectStyles, CardSubjectTeacherTypographyErrorStyles, CardSubjectTeacherTypographySubjectIDStyles, CardSubjectTeacherTypographySubjectNameStyles, CardSubjectTeacherYesStyles, CardSubjectTeacherlocationStyles } from "./Styles/CardSubjectTeacherPageStyles";

const settings = [
  { Edit: "Edit" },
  { Delete: "Delete" },
  { AddStd: "Add Student" },
  { DeleteStd: "Delete Student" },
];

function CardSubjectTeacher(prop) {
  const { SJname, SJid } = prop;

  const [dialogStatus, setDialogStatus] = useState({
    Edit: false,
    Delete: false,
    AddStd: false,
    DeleteStd: false,
  });
  const [editTF, setEditTF] = useState({
    oldSubjectId: SJid,
    subjectIdTF: SJid,
    subjectNameTF: SJname,
  });

  const [textError, setTextError] = useState({
    SubjectIdEdit: false,
  });
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [SJidSubject, setSJidSubject] = useState(SJid);

  const [dialogAddstate, setDialogAddstate] = useState(false);
  const [dialogDeleteStudentstate, setDialogDeleteStudentstate] =
    useState(false);
  const [dialogDeletestate, setDialogDeletestate] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const labelvideos = "videos ";

  const handleChangeStatus = (name) => {
    setDialogStatus((prevStatus) => ({
      ...prevStatus,
      [name]: !prevStatus[name],
    }));
    console.log("name: ", name);
  };
  const handleChangeAlert = (name) => {
    setTextError((prevStatus) => ({
      ...prevStatus,
      [name]: !prevStatus[name],
    }));
    console.log("name: ", name);
  };
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditTF({
      ...editTF,
      [name]: value,
    });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  const handleEditsubject = async (e) => {
    e.preventDefault();
    try {
      const response = await EditSubject(editTF);
      console.log("ResponseEdit: ", response);
      if (response === true) {
        prop.onClick();
        handleChangeStatus("Edit");
        setTextError({ SubjectIdEdit: false });
      } else {
        setTextError({ SubjectIdEdit: true });
        console.log("รหัสผ่านนี้มีอยู่แล้ว");
      }
    } catch (error) {
      console.error("error getSubject request: ", error);
    }
    setAnchorElUser(null);
  };
  const handleDeletesubject = async (e) => {
    e.preventDefault();
    console.log("Delete? : ", SJid);
    try {
      const response = await DeleteSubject(SJid);
      console.log("ResponseDelete: ", response);
      prop.onClick();
      handleChangeStatus("Delete");
    } catch (error) {
      console.error("error getSubject request: ", error);
    }
    setAnchorElUser(null);
  };

  const handleCancle = (name) => {
    handleChangeStatus(name);
    setAnchorElUser(null);
  };
  const handleCancleDeleteStd = () => {
    handleChangeStatus("DeleteStd");
    setAnchorElUser(null);
  };
  return (
    <>
      <Grid item xs={2} sm={6} md={4}>
        <Box sx={CardSubjectTeacherBoxStyles}>
          <Grid container>
            <Grid item xs={10}>
              <Link to="/videosTeacher" style={CardSubjectTeacherLinkSubjectStyles} state={SJidSubject}>
                <Grid container spacing={8}>
                  <Grid item xs={2}>
                    <Avatar sx={CardSubjectTeacherAvatarStyles} aria-label="recipe">
                      <MenuBookIcon/>
                    </Avatar>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container sx={CardSubjectTeacherGridSubjectTitleStyles}>
                      <Grid item>
                        <Typography variant="body1" sx={CardSubjectTeacherTypographySubjectIDStyles}>{SJid}</Typography>
                      </Grid>
                      <Grid item sx={CardSubjectTeacherGridSubjectNameStyles}>
                        <Typography 
                          variant="body1" sx={CardSubjectTeacherTypographySubjectNameStyles}
                        >
                          {SJname}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={handleOpenUserMenu} aria-label="delete" size="large" sx={CardSubjectTeacherIconButtonStyles}>
                <MoreVertIcon/>
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                keepMounted
                sx={CardSubjectTeacherMenuStyles}
                id="menu-appbar"
                anchorOrigin={CardSubjectTeacherlocationStyles}
                transformOrigin={CardSubjectTeacherlocationStyles}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting)=>{
                  let Keys = Object.keys(setting)[0]
                  return(
                    <div>
                      {Keys === 'AddStd'?
                        <Divider/>:null
                      }
                      <MenuItem 
                        name={setting}
                        onClick={()=>handleChangeStatus(Keys)}
                      >
                        <ListItemIcon>
                          {Keys === 'Edit'?
                            <EditIcon fontSize='small' sx={CardSubjectTeacherMenuIconStyles}/>:null
                          }
                          {Keys === 'Delete'?
                            <DeleteIcon fontSize='small' sx={CardSubjectTeacherMenuIconStyles}/>:null
                          }
                          {Keys === 'AddStd'?
                            <PersonAddAlt1Icon fontSize='small' sx={CardSubjectTeacherMenuIconStyles}/>:null
                          }
                          {Keys === 'DeleteStd'?
                            <PersonRemoveIcon fontSize='small' sx={CardSubjectTeacherMenuIconStyles}/>:null
                          }
                        </ListItemIcon>
                        <ListItemText textAlign="center" sx={CardSubjectTeacherMenuIconStyles}>
                          {setting[Keys]}
                        </ListItemText>
                      </MenuItem>
                    </div>
                  )
                })}
              </Menu>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Dialog
        open={dialogStatus.Edit}
        onClose={() => handleChangeStatus("Edit")}
        scroll="paper"
      >
        <form onSubmit={handleEditsubject}>
          <DialogContent sx={CardSubjectTeacherDialogSubjectStyles}>
            <Typography variant="body1" sx={CardSubjectTeacherTypographyDialogSubjectStyles}>
              Edit Subject
            </Typography>
            <TextField
              fullWidth
              name="subjectIdTF"
              className="TextfieldBorderRadius"
              placeholder="subject ID"
              type={"text"}
              value={editTF.subjectIdTF}
              sx={CardSubjectTeacherTextFieldIDStyles}
              onChange={handleChangeEdit}
            />
            <TextField
              fullWidth
              name="subjectNameTF"
              className="TextfieldBorderRadius"
              placeholder="subject Name"
              type={"text"}
              value={editTF.subjectNameTF}
              sx={CardSubjectTeacherTextFieldNameStyles}
              onChange={handleChangeEdit}
            />
            {textError.SubjectIdEdit === true ? (
              <Grid container sx={CardSubjectTeacherErrorStyles}>
                <Grid item>
                  <Typography variant="caption" sx={CardSubjectTeacherTypographyErrorStyles}>
                    รหัสวิชานี้มีอยู่แล้วในระบบ
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
            {/* <p>Hi</p> */}
          </DialogContent>
          <DialogActions>
            <Button
              style={CardSubjectTeacherCancleStyles}
              onClick={() => {
                handleChangeStatus("Edit");
                setAnchorElUser(null);
              }}
            >
              Cancle
            </Button>
            <Button
              style={CardSubjectTeacherYesStyles}
              type="submit"
              // onClick={()=>{handleEditsubject();}}
            >
              Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={dialogStatus.Delete}
        onClose={() => handleChangeStatus("Delete")}
        scroll="paper"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="body1" sx={CardSubjectTeacherBoldTextStyles}>
            Delete Subject?
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={CardSubjectTeacherDialogSubjectStyles}
        >
          <Grid container sx={CardSubjectTeacherGridDeleteSubjectStyles}>
            <Typography
              variant="body1"
              sx={CardSubjectTeacherTextStyles}
            >
              ต้องการที่จะลบรายวิชา{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={CardSubjectTeacherBoldTextStyles}
            >
              {SJidSubject}
            </Typography>
            <Typography
              variant="body1"
              sx={CardSubjectTeacherText2Styles}
            >
              {" "}
              ใช่ใหม?
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleChangeStatus("Delete");
              setAnchorElUser(null);
            }}
            autoFocus
            style={CardSubjectTeacherCancleStyles}
          >
            No
          </Button>
          <Button style={CardSubjectTeacherYesStyles} onClick={handleDeletesubject}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogStatus.AddStd}
        onClose={() => handleChangeStatus("AddStd")}
        scroll="paper"
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          {/* <DialogAddStudent {...{SJidSubject}}/> */}
          <DialogInsetStudent {...{ SJidSubject }} />
        </DialogContent>
        <DialogActions>
          <Button
            style={CardSubjectTeacherCancleStyles}
            onClick={() => {
              handleCancle("AddStd");
            }}
          >
            Cancle
          </Button>
          <Button
            style={CardSubjectTeacherYesStyles}
            onClick={() => {
              handleCancle("AddStd");
            }}
          >
            save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogStatus.DeleteStd}
        onClose={() => handleChangeStatus("DeleteStd")}
        scroll="paper"
      >
        <DialogDeleteStudent
          SJid={SJidSubject}
          onClosed={handleCancleDeleteStd}
        />
        {/* <DialogActions>
                <Button 
                    style={{ color: 'red'}}
                    onClick={()=> {handleCancle('DeleteStd')}}
                >
                    Cancle
                </Button>
                <Button 
                    style={{ color: 'green'}}
                    onClick={()=>{handleCancle('DeleteStd')}}
                >
                    save
                </Button>
            </DialogActions> */}
      </Dialog>
    </>
  );
}

export default CardSubjectTeacher;

import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Avatar, TextField, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import axios from 'axios';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function DialogAddStudent(prop) {
  const [sjId, setSjId] = React.useState(prop.SJidSubject);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [search,setSearch] = React.useState("");
  const [search1,setSearch1] = React.useState("");
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [userSubject,setUserSubject] = React.useState();
  const [user,setUser] = React.useState();
  const [userRequest,setUserRequest] = React.useState();

  React.useEffect(()=>{
    console.log('propAddd:',prop);
    handleAdd();
  },[]);

  const handleAdd =async()=>{
    let UsubjectItems = undefined;
    let UItems = undefined;
    let UItemsRQ = undefined;
    if(userSubject===undefined){
      // ในรายวิชา
        await axios.get(`https://vel063.comsciproject.net/api/user.php/check/${sjId}`).then(response => response.data)
        .then((data)=>{
            console.log('UserSJ1: ',data);
            setUserSubject(data);
            UsubjectItems = data;
        });
    }
    if(user === undefined){
      await axios.get(`https://vel063.comsciproject.net/api/user.php`).then(response => response.data)
      .then((data)=>{
          setUser(data);
          UItems = data;
          console.log('item00: ',data);
      });
    }
    if(user === undefined){
        await axios.get(`https://vel063.comsciproject.net/api/studentREQUEST.php/getSTRQ/${sjId}`).then(response => response.data)
        .then((data)=>{
          setUserRequest(data);
            UItemsRQ = data;
            console.log('item01: ',data);
        });
    }
    if(UsubjectItems!== undefined && UItems !== undefined){
      console.log('UserSJ11: ',UsubjectItems);
        UItems.map((item,i)=>{
            console.log('item000: ',item);
            if(item.Uid !== '1234'){
                if(item.Uid === '63011212033'){
                    console.log('item0: ',item);
                }
                if(UsubjectItems.find(e => e.Uid === item.Uid)!==undefined){
                    console.log('item: ',item);
                    let dataform = {
                        Sid: item.Uid,
                        Sname: item.Sname,
                        User_PIC: item.User_PIC
                    }
                    let data = right;
                    if(data.find(e=>e.Sid === dataform.Sid)===undefined){
                        data.push(dataform);
                        setRight(data);
                    }
                    
                }else{
                  if(UItemsRQ.find(e=> e.Sid === item.Uid)!==undefined){
                    console.log('itemRQ: ',item);
                    let dataform = {
                        Sid: item.Uid,
                        Sname: item.Sname,
                        User_PIC: item.User_PIC,
                    }
                    let data = left;
                    if(data.find(e=>e.Sid === dataform.Sid)===undefined){
                        data.push(dataform);
                        setLeft(data);
                    }
                  }
                    
                }
            }
        });

    }
    console.log('UserSJ1: ',userSubject);
    console.log('L: ',left);
    console.log('R: ',right);
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    console.log('ITem: ',numberOfChecked(items));
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    console.log('Right Concat: ',leftChecked);
    leftChecked.map((item)=>{
        axios.post(`https://vel063.comsciproject.net/api/studentSUBJECT.php/postSTsubject`, {
            Sid: item.Sid,
            SJid: sjId,
        })
        .then(function (response) {
            console.log("resyyyyyy: ",response);
            axios.delete(`https://vel063.comsciproject.net/api/studentREQUEST.php/${item.Sid}/${sjId}`)
            .then(function (response){
              console.log('res delete: ',response);
            }).catch(function (error){
                console.log(error);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    })
    
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    rightChecked.map((item)=>{
        axios.delete(`https://vel063.comsciproject.net/api/studentSUBJECT.php/${sjId}/${item.Sid}`)
        .then(function (response){
            console.log('res: ',response);
            axios.post(`https://vel063.comsciproject.net/api/studentREQUEST.php/Request/${item.Sid}/${sjId}`).then(response => response.data)
            .then((data)=>{
                console.log('Add request: ',data);
            });
        }).catch(function (error){
            console.log(error);
        });
    })
    
  };

  const customList = (title, items) => (
    <Card>
        <CardHeader
          sx={{ px: 2, py: 1, width:400,  }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={numberOfChecked(items) === items.length && items.length !== 0}
              indeterminate={
                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
            />
          }
          action={
              <Grid container padding={1}>
                  <Grid item xs={9}>
                          <TextField 
                              fullWidth 
                              label="Search ID" 
                              id="fullWidth"
                              name="searchName"
                              value={search} 
                              onChange={(e)=> setSearch(e.target.value)}
                              size="small"
                          />
                  </Grid>
              </Grid>
              
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} เลือก`}
        />
        <Divider />
        <List
          sx={{
            width:{lg:400, xs:280},  
            height: 230,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component="div"
          role="list"
        >
          {items.filter((item)=>{
              if(search.toLowerCase() === ''){
                  return item
              }else{
                if(item.Sid.toLowerCase().search(search.toLowerCase()) >=0){
                  return item
                }
              }
          })
          .map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem
                key={value.Sid}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Avatar 
                    // alt="Remy Sharp"
                    src={value.User_PIC!==null?`https://vel063.comsciproject.net/users/${value.User_PIC}`:null}
                    sx={{ bgcolor: indigo[900] }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.Sid} secondary={value.Sname}/>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItem>
            );
          })}
        </List>
    </Card>
  );

  const customList1 = (title, items) => (
    <Card>
        <CardHeader
        sx={{ px: 2, py: 1, width:400,  }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        action={
            <Grid container padding={1}>
                <Grid item xs={9}>
                        <TextField 
                            fullWidth 
                            label="Search ID" 
                            id="fullWidth"
                            name="searchName1"
                            value={search1} 
                            onChange={(e)=> setSearch1(e.target.value)}
                            size="small"
                        />
                </Grid>
            </Grid>
            
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} เลือก`}
      />
      <Divider />
      <List
        sx={{
          width:{lg:400, xs:280},  
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.filter((item)=>{
            if(search1.toLowerCase() === ''){
                return item
            }else{
              if(item.Sid.toLowerCase().search(search1.toLowerCase()) >=0){
                return item
              }
            }
        })
        .map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value.Sid}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Avatar 
                  // alt="Remy Sharp"
                  src={value.User_PIC!==null?`https://vel063.comsciproject.net/users/${value.User_PIC}`:null}
                  sx={{ bgcolor: indigo[900] }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.Sid} secondary={value.Sname}/>
              <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item xs={12} lg={4}>{customList('นิสิตทั้งหมด', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>{customList1('นิสิตในรายวิชา', right)}</Grid>
    </Grid>
  );
}
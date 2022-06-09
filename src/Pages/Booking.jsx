import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// import Backdrop from '@mui/material/Backdrop';
import { Link } from 'react-router-dom';

import CardComp from '../Components/Card'
// import {cc}  from '../Components/Card'obj
import axios from 'axios';

import 'reactjs-popup/dist/index.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// import Fade from 'react-reveal/Fade';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import {set} from '../Components/Card'
const SERVERURL='http://localhost:8080'

function Booking() {
    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        display:'grid',
      }))
    
    
    const[vegItems1,setVegitems1]=useState([])
    const[nonvegItems1,setNonvegitems1]=useState([])
    const[bu,setBu]=useState(true)
    const [open, setOpen] = React.useState(false);

    let iterator=[];
    useEffect(()=>{
        axios.get(`${SERVERURL}/vegList`)
        .then((items)=>{
          // console.log(items.data)
            setVegitems1(items.data)
        })
        .catch((err)=>{
          console.log(err)
        })

        axios.get(`${SERVERURL}/nonvegList`)
        .then((items)=>{
          // console.log(items.data)
          setNonvegitems1(items.data)
        })
        .catch((err)=>{
          console.log(err)
        })

    },[])



      const handleClose = () => {
        setOpen(false);
      };
      const handleToggle = () => {
        setOpen(!open);
      };


    const[ve,setVe]=useState('block')
    const[arr,setArr]=useState({})
    const[nonve,setNonve]=useState('none')
    function vegClick()
      {
        document.querySelector('.vv').style.borderRadius='20px'
        document.querySelector('.vv2').style.borderRadius='0px'
        setVe('block')
        setNonve('none')
      }
    function nonVegClick()
      {
        document.querySelector('.vv').style.borderRadius='0px'
        document.querySelector('.vv2').style.borderRadius='20px'
        setNonve('block')
        setVe('none')
      }

    function ordered()
    {
      handleToggle()
      
    }

    function handleConfirm()
    {
      document.querySelector('.ayy2').innerHTML=' '
      console.log('confirmed')
      console.log(iterator)
      let x=[]
      for(let j=0;j<iterator.length;j++)
      {
        let objnew=new Object({"id":arr[iterator[j]][0],"name":arr[iterator[j]][1],"count":arr[iterator[j]][2],"price":arr[iterator[j]][2]*arr[iterator[j]][3],"type":arr[iterator[j]][4],"ingredients":arr[iterator[j]][5],"time":arr[iterator[j]][6]})
        console.log(objnew)
        x.push(objnew)
      }

      console.log(x)
      axios.post(`${SERVERURL}/confirm`,x)
      .then((res)=>{
        console.log(res)
        // x=[]
        // window.location.reload()
        if(res.data.status==400) 
        {
          // console.log(res.data.orderId)
          document.querySelector('.ayy').style.display='none'
          document.querySelector('.ayy3').style.display='none'
          document.querySelector('.ayy4').style.display='none'
          document.querySelector('.ayy2').innerHTML='YOUR ORDER PLACED SUCCESSFULLY WITH ORDER ID '+String(res.data.id)
          setTimeout(()=>{
            window.location.reload()
          },4000)
        }
        if(res.data.status==500)
        {
          document.querySelector('.ayy2').innerHTML='UNABLE TO PROCESS YOUR ORDER'
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    Object.keys(arr).forEach(function(item){
      if(arr[item][2]>0)
        iterator.push(item)
    })
    // console.log(iterator)

    useEffect(()=>{
      // console.log(iterator)
      if(iterator.length>0)
        setBu(false)
      else
        setBu(true)
    },[iterator])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - iterator.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    function TablePaginationActions(props) {
      const theme = useTheme();
      const { count, page, rowsPerPage, onPageChange } = props;
    
      const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
      };
    
      const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
      };
    
      const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
      };
    
      const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };
    
      return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          {/* <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton> */}
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Box>
      );
    }
    
    TablePaginationActions.propTypes = {
      count: PropTypes.number.isRequired,
      onPageChange: PropTypes.func.isRequired,
      page: PropTypes.number.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
    };
  return (
    <div>
    <div>
        <h1> WELCOME TO TAJ</h1>
       <Link to="/admin-login">ADMIN LOGIN</Link>
  
      <hr></hr>
      <button className='vv' onClick={vegClick} style={{cursor:"pointer",marginRight:"4rem"}}>VEG</button>
      <button className='vv2' onClick={nonVegClick} style={{cursor:"pointer"}}>NON-VEG</button>
    </div>
    <div style={{marginTop:"2rem"}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid display={{display:"flex",justifyContent:"center"}} container spacing={2} columns={10}>
          
        <Grid style={{display:ve}} item xs={6}>
 
          <h3>VEG</h3>
          {vegItems1.map((item)=>(<CardComp setArr={setArr} item={item} key={item.id}/>))}

        </Grid>

        <Grid style={{display:nonve}}  item xs={6}>
            <h3>NON-VEG</h3>
          {nonvegItems1.map((item)=>(<CardComp setArr={setArr} item={item} key={item.id}/>))}
        </Grid>

      </Grid>
    </Box>
    </div>  

    <button disabled={bu} onClick={ordered} style={{cursor:"pointer",marginTop:"2rem",marginBottom:"2rem"}} title={bu==true?"Add atleast one item":""}>ORDER</button>
        {/* <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        > */}
<Dialog open={open} onClose={handleClose}>
  <DialogContent>
      <Card>
          <CardContent>
              <h1 className="ayy"  style={{textAlign:"center"}}>PLEASE CONFIRM !</h1>
              <h3 style={{textAlign:"center"}} className="ayy2"></h3>
              <TableContainer component={Paper}>
      <Table  className='ayy3' sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ITEM-ID</TableCell>
            <TableCell align="center">NAME</TableCell>
            <TableCell align="center">No. OF ITEMS</TableCell>
            <TableCell align="center">TOTAL PRICE</TableCell>

          </TableRow>
        </TableHead>
        <TableBody rowsPerPage="10">
          {/* {iterator.map((i) => ( */}
          {((rowsPerPage>0) ? (iterator.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)):iterator).map((i) => (
           <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {arr[i][0]}
              </TableCell>
              <TableCell align="center">{arr[i][1]}</TableCell>
              <TableCell align="center">{arr[i][2]}</TableCell>
              <TableCell align="center">{arr[i][2]*arr[i][3]}</TableCell>

            </TableRow>
          ))}

  {/* {ar1.map(([id,name,count,price]) => (
           <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center">{count}</TableCell>
              <TableCell align="right">{price}</TableCell>

            </TableRow>
          ))} */}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[8, 10, { label: 'All', value: -1 }]}
              colSpan={3}
              count={iterator.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
              <div className='ayy4' style={{display:"flex",justifyContent:"center",}}>
              <button style={{cursor:"pointer",marginTop:"1rem",margin:"5px"}} onClick={handleConfirm}>CONFIRM</button>
              <button style={{cursor:"pointer",marginTop:"1rem",margin:"5px"}} onClick={handleClose}>CANCEL</button>
              </div>
          </CardContent>
        </Card>
      {/* </Backdrop> */}
      </DialogContent>
    </Dialog>
    </div>
    
  )
}

export default Booking
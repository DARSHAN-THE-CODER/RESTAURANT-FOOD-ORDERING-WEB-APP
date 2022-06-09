import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import {Link,useParams} from 'react-router-dom'
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const SERVERURL='http://localhost:8080'


function Order() {

    let {id}=useParams()
    const[x,setX]=useState([])
    const[ord,setOrd]=useState([])
    const [open, setOpen] = useState(false);

    const navigate=useNavigate()
    useEffect(()=>{
        console.log(id)
        axios.get(`${SERVERURL}/order/${id}`)
        .then((res)=>{
            console.log(res.data[0])
            setX(res.data[0].orders)
            setOrd(res.data[0])
        })
    },[])
    console.log(ord)

    // console.log(ord.orders)
    console.log(x)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handlePrep()
    {
        console.log("preparedd")
        axios.patch(`${SERVERURL}/update/${id}`)
        .then((res)=>{
            // if(res.data.status==500)
            // {
            //     document.querySelector('.hh').innerHTML='FAILED TO UPDATE ORDER PREPARATION STATUS ! PLEASE TRY AGAIN ..'
            // }
            if(res.data.status==400)
            {
                handleClose()
                navigate('/orders')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div style={{marginTop:"2rem"}}>

        <Link to="/orders"><button style={{textAlign:"left",float:"left",cursor:"pointer"}} >BACK</button></Link>

        <button title='CLICK HERE IF ORDER IS PREPARED' onClick={handleClickOpen} style={{textAlign:"right",float:"right",cursor:"pointer"}}>ORDER PREPARED ?</button>

    <h2>ORDER_DETAILS : {id}</h2>
    <h3 className='hh'></h3>

      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>
          ORDER READY CONFIRMATION
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           PLEASE CLICK OK TO CONFIRM
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button style={{cursor:"pointer"}} autoFocus onClick={handleClose}>
            CANCEL
          </button>
          <button style={{cursor:"pointer"}} onClick={handlePrep} autoFocus>
            OK
          </button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
      <Table sx={{ }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell style={{fontWeight:"bold"}} align="center">Item ID</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Veg/Non-veg</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Item Name</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Ingredients</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">No. of items</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Approx time(in mins)</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Price(in Rs)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {x.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.ingredients}</TableCell>
              <TableCell align="center">{row.count}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default Order
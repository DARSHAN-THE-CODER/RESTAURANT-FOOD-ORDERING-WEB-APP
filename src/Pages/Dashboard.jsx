import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SERVERURL='http://localhost:8080'

function Dashboard() {

  let navigate=useNavigate();
  const[ord,setOrd]=useState([])
  useEffect(()=>{
    console.log(localStorage.getItem("allow"))
    if(localStorage.getItem("allow"))
    {
        console.log("ok")
        axios.get(`${SERVERURL}/orders`)
        .then((res)=>{
            
            console.log(res.data)
            setOrd(res.data)
        })
    }
    else{
        navigate("/admin-login")
    }
  },[])
  console.log(ord)
  return (
    <div >
    <Link to="/"><button style={{textAlign:"right",float:"left",cursor:"pointer"}}>BACK</button></Link> 
    {
        ord.length==0 && (
            <h2>NO MORE ORDERS PENDING!</h2>
        )
    }
<div style={{display:"flex",justifyContent:"center",marginTop:"10%"}}>
<TableContainer  sx={{ maxWidth: 350  }}  component={Paper}>
      <Table sx={{ maxWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Sl</TableCell>
            <TableCell style={{textAlign:"center",fontWeight:"bold",fontSize:"2rem"}}>ORDERS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {ord.map(({orderId},index) => (
            <TableRow
              key={orderId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell  component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <Link to={`/order/${orderId}`}>{orderId}</Link>
              </TableCell>
              {/* <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>

  )
}

export default Dashboard
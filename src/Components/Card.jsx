import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Booking from '../Pages/Booking';


export default function CardComp({item:props,setArr})
{

    const[count,setCount]=useState(0)

    function increment()
    {
        setCount(count+1)
        setArr((prev)=>({...prev,[props.id]:[props.id,props.name,count+1,props.price,props.type,props.ingredients,props.time]}))
    }
    function decrement()
    {
        if(count>0)
           { setCount(count-1)
            setArr((prev)=>({...prev,[props.id]:[props.id,props.name,count-1,props.price,props.type,props.ingredients,props.time]}))
           }
    }
    return(
    <Card className='mt-4' sx={{ marginTop:"2rem" }}>
      <CardMedia
        component="img"
        height="140"
        image={props.photoUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {props.description}
        </Typography>
        <Typography style={{fontWeight:1000}} variant="body2" color="text.secondary">
           Price : {props.price}/-
        </Typography>
      </CardContent>
      <CardActions style={{display:"flex",justifyContent:"center"}}>
        {/* <Button style={{color:"black",background:"black"}} size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
        <button style={{cursor:"pointer"}} onClick={increment}>+</button>
        <h3 style={{marginLeft:"6px",textAlign:"center"}}>{count}</h3>
        <button style={{cursor:"pointer"}} onClick={decrement}>-</button>

      </CardActions>
    </Card>
    )
}

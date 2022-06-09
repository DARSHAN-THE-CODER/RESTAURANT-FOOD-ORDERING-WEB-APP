import React ,{useState}from 'react'

import axios from 'axios'

const SERVERURL='http://localhost:8080'
function Form() {
    const [id,setId]=useState(0)
    const [typ,setTyp]=useState('')
    const [nam,setNam]=useState('')
    const [description,setDescription]=useState('')
    const [url,setUrl]=useState('')
    const [price,setPrice]=useState(0)
    const [time,setTime]=useState(0)
    const [ingr,setIngr]=useState('')

    function handleForm(e)
    {
        e.preventDefault()
        console.log(id,typ,nam,description,url,price,time,ingr)
        let obj={id:id,type:typ,name:nam,description:description,photoUrl:url,price:price,time:time,ingredients:ingr}
        axios.post(`${SERVERURL}/veg`,obj)
        .then((res)=>{
            
            
        }).catch((err)=>{
            console.log(`Error occured while posting`)
            console.log(err)
        })
    }
  return (
    <div>
    Form
        <form >
            <input type="number" value={id} onChange={(e)=>setId(e.target.value)} placeholder='id'></input>
            <hr></hr>
            <input type="string" value={typ} onChange={(e)=>setTyp(e.target.value)} placeholder='type'></input><hr></hr>
            <input type="string" value={nam} onChange={(e)=>setNam(e.target.value)} placeholder='name'></input><hr></hr>
            <input type="string" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='description'></input><hr></hr>
            <input type="string" value={url} onChange={(e)=>setUrl(e.target.value)} placeholder='URL'></input><hr></hr>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='price'></input><hr></hr>
            <input type="number" value={time} onChange={(e)=>setTime(e.target.value)} placeholder='time in mins'></input><hr></hr>
            <input type="string" value={ingr} onChange={(e)=>setIngr(e.target.value)} placeholder='ingredients'></input><hr></hr>
            <input type="submit" onClick={handleForm}></input>
        </form>
    </div>
  )
}

export default Form
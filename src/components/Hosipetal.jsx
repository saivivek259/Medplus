
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
// import { Navigator } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Hospital(){
    const API = import.meta.env.VITE_REACT_API3
    const [latLng,setLatLng] =useState({})
    const [Hos,setHos] = useState([])
    const navigate = useNavigate();
    
    useEffect(() =>{
        if('geolocation' in navigator ){
            navigator.geolocation.getCurrentPosition((position) =>{
                setLatLng({
                    lat : position.coords.latitude,
                    lng : position.coords.longitude
                });
            }  )
            
        } 
    } ,[] )


const fetchData = async () => {
    try{
        const response = await axios.get(`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=place:513cf14174ad955340593df9aa4b7c523240f00103f901d308a88500000000c00207&limit=20&apiKey=786a0488f99c448aacdd61803fd115bb `)
        setHos(response.data.features);
    }catch{
        console.log(console.error())
    }
}

    useEffect(() =>{
        fetchData();
    },[latLng] )



       

    return(
        <div>
            <h1>Nearby Hospitals</h1>
            <div style={{display:"flex",flexWrap:'wrap'}} >

            
            {Hos.map((item,index) =>{

            return(
                <div key={index} onClick={() => navigate('/more/ ',{state:item.properties}) } style={{border:'1px solid black',width:'40%',margin:50}}>
                    <div style={{margin:10}} >
                        <h2>{item.properties.name}</h2>
                        </div>
                   
                    </div>
            )  } )}  </div>         
        </div>
    )
}
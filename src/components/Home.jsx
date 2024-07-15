import React from "react";
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../App.css'


export default function Home(){
    const [latLng,setLatLng] =useState({})
    const [hospitals,setHospitals] = useState([])
    const navigate = useNavigate();

    const Api = import.meta.env.VITE_REACT_API 
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


  useEffect(()=> {
  
    if(Object.keys(latLng).length > 0 ){
      const geoAPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=place:513cf14174ad955340593df9aa4b7c523240f00103f901d308a88500000000c00207&limit=20&apiKey=786a0488f99c448aacdd61803fd115bb `
      axios.get(geoAPI).then(res => 
       {

        const featuresArr =  res.data.features;
        const namesArr = []
        featuresArr.map((feature) => namesArr.push(feature.properties) )
        setHospitals(namesArr)        
    }
          )
    }
  },[latLng])



  const handleClick = (hospital) =>{
    navigate('/more/',{state:hospital});
   }

    return(
        <div style={{backgroundColor:'white'}} >
        <div style={{margin:50}} >
        <Row xs={1} md={2} className="g-4">
        {hospitals.map((hospital,index) =>{
           return(
            <Col key={index}   >
            <Card className="card" style={{cursor:'pointer',height:'100%'}} onClick={() => handleClick(hospital)} >
            <Card.Body className="colum" >
            <Card.Title>{hospital.name}</Card.Title>
            <Card.Text>
            {hospital.address_line2}
             </Card.Text>
            </Card.Body>
            </Card>
            </Col>
                  )
            } )
          }      
        </Row>
        </div>        
        </div>
        )
}
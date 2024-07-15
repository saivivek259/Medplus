import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const More =() => {
    const [latLng,setLatLng] =useState({})
    const API = import.meta.env.VITE_REACT_API2
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
        const location = useLocation()
         const {name,state,lon,lat,formatted,website,city} = location.state
        const [address, setAddress] = useState('');

        useEffect(() => {
            navigator.geolocation.getCurrentPosition((position) => {
             const { latitude, longitude } = position.coords;
            const formattedAddress = `${latitude},${longitude}`

         setAddress(formattedAddress);
         });
        }, [latLng]);

    const [route,setRoute] = useState([])
    const [route1 ,setRoute1] = useState([])
    const [route2 ,setRoute2] = useState([])
    const [route3 ,setRoute3] = useState([])
    const [route4 ,setRoute4] = useState([])
    const [route5 ,setRoute5] = useState([])
    
    useEffect(() =>{
        const RouteURL =  `https://api.geoapify.com/v1/routing?waypoints=18.3222091,78.3387118|${lat},${lon}&mode=drive&apiKey=786a0488f99c448aacdd61803fd115bb`
        axios.get(RouteURL).then(res =>{
            const routeArr =  res.data.features;    
            const namesArr = [];
          routeArr.map((data) => namesArr.push(data.properties) )
          const newArr = []
          namesArr.map((leg) => newArr.push(leg.legs) )
          const finalArr = []
          newArr.map((d) => finalArr.push(d[0].steps) )
          const textArr = []
          finalArr.map((t) => textArr.push(t[0].instruction.text) )
          const text1Arr = []
          const text2Arr = []
          const text3Arr = []
          const text4Arr = []
          const text5Arr = []
          const text6Arr = []
          finalArr.map((t1) => text1Arr.push(t1[0].instruction.text) )
          finalArr.map((t2) => text2Arr.push(t2[1].instruction.text) )
          finalArr.map((t3) => text3Arr.push(t3[2].instruction.text) )
          finalArr.map((t4) => text4Arr.push(t4[3].instruction.text) )
            finalArr.map((t5) => text5Arr.push(t5[4].instruction.text) )          
          setRoute(textArr) 
          setRoute1(text1Arr)
          setRoute2(text2Arr)
          setRoute3(text3Arr)
          setRoute4(text4Arr)
            setRoute5(text5Arr)
        } )
    } ,[route])

    return(
        <div style={{display:'flex',flexDirection:'row',marginTop:30,marginLeft:30}}>
           <div style={{border:'1px solid black',borderRadius:'10px', width:'45%',paddingLeft:30,paddingTop:30,backgroundColor:'white',color:'black'}} >
            <div  >
            <h3 style={{marginBottom:25,textAlign:'center'}} >{name}</h3>
            <h5 style={{marginBottom:13}}> User Lattitute : {latLng.lat}</h5>
            <h5 style={{marginBottom:13}}> User Longitude : {latLng.lng}</h5>
            <h5 style={{marginBottom:13}}> User Formatted address :  </h5>
            </div>
            <div>
                <h5 style={{marginBottom:13}} > Hospital Lattitude :  {lat} </h5>
                <h5 style={{marginBottom:13}} > Hospital Longitute :  {lon} </h5>
                <h5 style={{marginBottom:13}}> Hospital Formatted Address :  {formatted} </h5>

            </div>
            <div>
                <h5 style={{marginBottom:13}} >Hospital Website:  {website} </h5>
                <h5 style={{marginBottom:13}} >Hospital E-mail: </h5>
                <h5 style={{marginBottom:13}} >State:  {state}</h5>
                <h5 style={{marginBottom:13}} >City :  {city}</h5>
            </div>

            

           </div>
           <div style={{border:'1px solid black',marginLeft:50 ,width:'50%',borderRadius:'20px' ,backgroundColor:'white',color:'black'}}>
            <h3 style={{textAlign:'center' ,marginTop:25 }} >Directions</h3>
            <div >
                <ul style={{margin:20,display:'flex',flexDirection:'column',justifyContent:'space-evenly'}} >
                <li  style={{margin:20}} > <h5> {route} </h5> </li>
                <li style={{margin:20}} > <h5> {route1} </h5> </li>
                <li style={{margin:20}} > <h5> {route2} </h5> </li>
                <li style={{margin:20}} > <h5> {route3} </h5> </li>
                <li style={{margin:20}} > <h5> {route4} </h5> </li>
                <li style={{margin:20}} > <h5> {route5} </h5> </li>
                </ul>


            </div>
           </div>
        </div>
    )
}

export default More;
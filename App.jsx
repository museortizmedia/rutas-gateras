import { useState, useEffect } from "react";
import React from 'react';
import { Map, Marker, ZoomControl, /*Overlay*/ } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'

import Menu from './components/Menu';
import Sidebar from './components/Sidebar';
import Mouse from "./components/Mouse";
import Spinner from "./components/Spinner";


function App() {
  const [loading, setLoading] = useState(true)

  const maptilerProvider = maptiler('OeC7UjZWzAPnrhmLpPbX', 'basic-v2');
  const [mapCenter, setMapCenter] = useState([3.451245219418733, -76.54367205437333])
  const [mapZoom, setMapZoom] = useState(18)

  const color="#99F";

  const webconsume = (api, onsucces, onfail) => {
    setLoading(true);
    fetch(api, {
      //redirect: "follow",
      method: 'GET',
    })
    .then(response => {if (response.ok) return response.json();})
    .then(data=>{
      console.log(data)
      if(onsucces!=null){onsucces(data);}
      return data
    }).catch(error=>{
      console.log(error)
      if(onfail!=null){onfail(error);}
      return error
    }).finally(()=>{setLoading(false);})
  }
  const url = "https://script.google.com/macros/s/AKfycbwMGzDDt_fhdIlXU6FHvcZtjHbIiKC3izFa54LNSma2oRSfEcn2PZ75mVyo2uXWF7NJAw/exec";
  const [gatas, setGatas] = useState([])
  const [sidedata, setSidedata] = useState({});
  useEffect(() => {
    getGatas();
  }, []);
  const getGatas = ()=>{
    webconsume(url,
      (data) =>{
        setGatas(JSON.parse(data));
      }
    );
  }

  const [currentCenter, setCCenter] = useState([3.451245219418733, -76.54367205437333])
  const [coordCenter, setCoorCenter] = useState(false)
  const toogleCoorCenter = ()=>{
    setCoorCenter(!coordCenter);
  }

  useEffect(() => {
    if(Object.keys(sidedata).length !== 0){
      document.getElementById("demo").classList.add("show");
    }
  }, [sidedata]);
  
  return (
    <div className="bg-dark bg-gradient" style={{height: "100hv", width: "100wv"}}>
    <Spinner active={loading}/>
    <Mouse/>
    <Menu />
    <Sidebar data={sidedata} butons={toogleCoorCenter} newCoor={currentCenter} webreport={webconsume} reload={getGatas}/>
    <div className="map" style={{height: "89.6vh"}}>
    <Map 
    provider={maptilerProvider}
    dprs={[1, 2]}
    defaultCenter={mapCenter}
    defaultZoom={mapZoom}
    onBoundsChanged={({ center, zoom }) => {
      setCCenter(center)
    }}
    >
      {coordCenter?

      <Marker
      width={50}
      anchor={currentCenter}
      color={"cyan"}
      />
      
      :
         
      gatas.map((gata, index)=>{
        return(
          <Marker key={index}
          width={50}
          anchor={gata.coord}
          color={gata?.color??color}
          onClick={()=>{setCCenter(gatas[index].coord); setSidedata(gatas[index]);}}
          />
        )})
           
    }


{/*<Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
        <img src='/img/pigeon.jpg' width={240} height={158} alt='' />
  </Overlay>*/}

    </Map>
    </div>
    </div>
  );
}

export default App;

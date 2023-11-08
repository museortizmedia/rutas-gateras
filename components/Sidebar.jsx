import React from "react";
import {useEffect, useState} from 'react';

function Sidebar(props) {
  const slidedata = props.data;
  const toogleCD = props.butons;
  const currentCoord = props.newCoor;
  const webReport = props.webreport;
  const reloadMarkers = props.reload;
  /*useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        console.log(formActive)
        hideitself();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
  }, []);*/

  const [imageURL, setImageSRC] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = slidedata.photoURL;
    
    img.onload = () => {
      setImageLoaded(true);
      setImageSRC(slidedata.photoURL);
    };

    img.onerror = () => {

    };
  }, [slidedata]);

  const hideitself=()=>{
      if(formActive){toogleCD(); setFormActive(false);}

      setImageSRC("");
      
      document.getElementById("alert").classList.add("d-none");
      document.getElementById("form").classList.add("d-none");
      

      document.getElementById("demo").classList.remove("show");
  }

  const [formActive, setFormActive] = useState(false);
  
  const activeform=()=>{
    if(formActive){disactiveform(); return;}
    setFormActive(true);
    document.getElementById("form").classList.remove("d-none");
    toogleCD();
  }

  const disactiveform=()=>{
    setFormActive(false);
    document.getElementById("form").classList.add("d-none");

    document.getElementById("alert").classList.add("d-none");

    toogleCD();
  }


  const sendform=()=>{
    const info = {x: currentCoord[0].toString().replace(".",","), y: currentCoord[1].toString().replace(".",","), id: slidedata.id, url: "https://script.google.com/macros/s/AKfycbwMGzDDt_fhdIlXU6FHvcZtjHbIiKC3izFa54LNSma2oRSfEcn2PZ75mVyo2uXWF7NJAw/exec"}
    webReport(info.url+"?id="+info.id+"&x="+info.x+"&y="+info.y,
      (data) =>{
        disactiveform();
        reloadMarkers();
      }
    );
  }


    return (
        <div className="offcanvas offcanvas-end" id="demo">
          <div className="offcanvas-header">
          <h1 className="offcanvas-title">{slidedata?.nombre}</h1>
          <button type="button" className="btn-close" onClick={hideitself}></button>
          </div>
        
          <div className="row w-75 mx-auto d-none" id="alert">
          <div className="alert alert-success alert-dismissible">
            <button type="button" className="btn-close" onClick={()=>{document.getElementById("alert").classList.add("d-none");}}></button>
            <strong>Enviado!</strong> Revisaremos tu reporte de cambio de ubicación.
          </div>
          </div>

        <div className="offcanvas-body element-con-scroll text-center">
        <div>
          {imageLoaded ? (
            <>
              <img className="img-thumbnail object-fit-cover my-5" src={imageURL} alt={"fotografía de estatua de "+slidedata?.nombre}/>
            </>
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>
          <p className="py-md mx-auto">
            {slidedata?.desc}
          </p>
          <div className="pt-3 d-flex">
          <video className="mx-auto w-auto h-50 object-fit-cover" controls>
            <source src={slidedata?.videoUrl} type="video/mp4"/>
            Tu navegador no soporta el elemento de video.
          </video>
          </div>
          <button className="my-3 btn btn-outline-info" onClick={activeform}>{formActive?"Cerrar Informe":"Informar Cambio de Ubicacion"}</button>
          
          <div className="row d-none" id="form">
          <p className="mx-auto w-75">Mueve el mapa para acomodar la marca de la nueva posicion.</p>
          <div className="input-group mb-3">
          <input type="text" className="form-control" disabled placeholder="Coordenada X" value={currentCoord[0]} />
          <input type="text" className="form-control" disabled placeholder="Coordenada Y"value={currentCoord[1]} />
          </div> 
          
              <button className="btn btn-primary w-75 mx-auto" onClick={sendform}>Enviar</button>
          </div>

        </div>
        
      </div>
    );
}
export default Sidebar;
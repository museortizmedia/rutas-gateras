function Spinner(props){
    const active = props.active;

if(active){
return (
<div className="d-flex justify-content-center align-items-center bg-white" style={{width: "100vw", height: "100vh", position: "absolute", zIndex: 10001}}>
    <button className="mycursor btn bg-transparent disabled border-0 ">
    <span className="spinner-border spinner-border-lg"/>
    </button>
    <div className="mt-5">Cargando...</div>
</div>
)
}else{return<></>}
}
export default Spinner;
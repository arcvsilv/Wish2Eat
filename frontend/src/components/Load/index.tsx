import React from 'react';
// import ClipLoader from "react-spinners/ClipLoader";
import ReactLoading from 'react-loading'
import './style.css'

const Load = ({loading}) => {
      
    return (
        <div className="sweet-loading">        
            {/* <ClipLoader color="#FF4646;" loading={loading} size={150} /> */}
            <ReactLoading type='spinningBubbles' color="#FF4646"></ReactLoading>
        </div>  
    );
}


   
export default Load;
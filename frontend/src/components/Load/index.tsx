import React from 'react';
import ReactLoading from 'react-loading'
import './style.css'

const Load = ({loading}) => {
      
    return (
        <div className="sweet-loading">        
            <ReactLoading type='spinningBubbles' color="#FF4646"></ReactLoading>
        </div>  
    );
}


   
export default Load;
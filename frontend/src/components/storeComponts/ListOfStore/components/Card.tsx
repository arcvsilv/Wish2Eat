import React from 'react';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded'
import { Typography } from '@material-ui/core'
import './style.css'

export default function Card(prop: {id: any; name:string}){
    return (
        <>            
            <div className={`card ${prop.id}`}> 
                <div className="cardimg"> </div>
                <div className="cardinfo">
                    <div className="cardicon">                        
                        <RestaurantRoundedIcon fontSize="large" className="icon"/>
                    </div>
                    <div className="cardname">
                        <Typography paragraph={true} >
                            {prop.name}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
};

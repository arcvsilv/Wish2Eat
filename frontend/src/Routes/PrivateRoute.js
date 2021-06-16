import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GlobalContext } from '../components/Context';
import PropTypes from 'prop-types';
import Load from '../components/Load';

// const PrivateRoute = ({ ...props }) => {
    
const PrivateRoute = ({ path, ...props }) => {

    const global = React.useContext(GlobalContext);


    if ((global.storeLogada != undefined) && (global.storeLogada != null)) {        
        console.log("teste" + path)
        return (
            <Route path={path} exact>
                {/* {path != 'store/:id/product/insert' ? 
                    <props.component update={props.update} /> 
                : 
                    <props.component />
                }                 */}
                <props.component />
            </Route>    
        );        
    } else {
        return (
            <Redirect to='/signin' />            
            

            // </Route>    
            // <Route
            // {...props}
            //     render={() => {
            //         ((global.storeLogada != undefined) && (global.storeLogada != null))
            //         ? <Component {...props} />
            //         : <Redirect to='/signin' />
            //     }
            //     }
            // />
        )
    }
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    component: PropTypes.Component,
    path: PropTypes.string,
    update: PropTypes.any,
};
import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../core/assests/ico/Wish2eat.svg'
import { useParams } from 'react-router-dom';
import NavItems from './navitems';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import { GlobalContext } from '../Context';
import './style.css'

const NavBar = () => {
    type StoreParams = {
        id: string;
    }
    const { id } = useParams<StoreParams>();
    const [store, setStore] = useState("");
    const global = React.useContext(GlobalContext);

    useEffect(() => {
        // api.get(`store/${id}`)
        //     .then((response) =>
        //         setStore(response.data.name)
        //     );
    }, [])

    return (
        <div className="headernavbar">
            <nav className="navbar navbar-fixed-top navbar-expand-lg navbar-dark">
                <div className="navbar-brand" //href="#"
                >
                    <Logo className="logo-svg" />
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" />

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <span className="NavName"> {store} </span>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <NavItems logado={global.storeLogada} />
                </div>
            </nav>
        </div>
    );
}

export default NavBar;


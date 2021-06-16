import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../services/api';
import NavBar from '../../components/Header'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import Load from '../../components/Load'
import axios from 'axios';
import './style.css';

const StoreDetails = () => {
    type StoreParams = {
        id: string;
    };
    const { id } = useParams<StoreParams>();
    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState();
    const [name, setName] = useState();
    const [cep, setCep] = useState();
    const [address, setAddress] = useState();
    const [uf, setUf] = useState();
    const [city, setCity] = useState();
    const [distric, setDistrict] = useState();
    const [number, setNumber] = useState();
    const [instagram, setInstagram] = useState();
    const [facebook, setFacebook] = useState();

    useEffect(() => {
        
        api.get(`store/${id}`)
            .then(response => {
                // console.log(response.data);
                setStore(response.data)
                setName(response.data.name)
                setCep(response.data.cep)
                setNumber(response.data.number)
                GetAddress(response.data.cep)
                setInstagram(response.data.instagram)
                setFacebook(response.data.facebook)
                setLoading(false);
            });
    }, []);

    function GetAddress(cep) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
                setAddress(response.data.logradouro)
                setCity(response.data.localidade)
                setUf(response.data.uf)
                setDistrict(response.data.bairro)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className="parent">
            < NavBar />
            <div className="conteudo">
                {!loading ? (
                    <div>
                        <div className="contentStoreName">
                            <div className="storeImage">

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group Name"> {name}</li>
                                <li className="list-group-item" />
                            </ul>
                            <div className="detail">
                                <div className="detail1">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            CEP: {cep}
                                            <p> {address} Nº {number}</p>
                                            {distric}
                                            <p> {city}  </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="detail2">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <InstagramIcon />  {instagram}
                                            <p> <FacebookIcon />   {facebook}  </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Menu admin={false} />
                        </div>
                    </div>
                ) : (
                    <Load loading={loading} />
                )}
            </div>
        </div>
    );
}

export default StoreDetails;

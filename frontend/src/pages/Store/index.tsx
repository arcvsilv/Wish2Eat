import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import api from '../../services/api'
import MyModal from '../../components/Modal'
import Input from '../../components/Input'
import NavBar from '../../components/Header'
import { makeStyles } from '@material-ui/core/styles'
import Row from 'react-bootstrap/Row'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel'
import { ReactComponent as Logo } from '../../core/assests/ico/logo.svg'
import Modal from 'react-bootstrap/Modal'
import { Button } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

const useStyles = makeStyles((props) => ({
    formControl: {
        margin: props.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: props.spacing(2),
    }
}));

const FormStore = () => {
    type StoreParams = {
        id: string;
    }
    const { id } = useParams<StoreParams>();

    const styleProps = { display: 'block' };
    const styleHidden = { display: 'none' }
    const history = useHistory();
    const classes = useStyles();
    const [store, setStore] = useState([]);
    const [name, setName] = useState();
    const [type, setType] = useState(1);
    const [cep, setCep] = useState();
    const [address, setAddress] = useState();
    const [uf, setUf] = useState<any | null>(null);
    const [city, setCity] = useState();
    const [distric, setDistrict] = useState();
    const [number, setNumber] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [instagram, setInstagram] = useState();
    const [facebook, setFacebook] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [showCreate, setShowCreate] = useState(false);
    const [showError, setShowError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [messageError, setMessageError] = useState('');
    const handleCloseCreate = () => setShowCreate(false);
    const handleCloseError = () => setShowError(false);

    const handleShow = () => {
        setShowCreate(true);
        history.push(`/signin`)
    }
    
    function handleShowError() {
        setShowError(true);
    }

    function onHidden() {
        if (!email) {
            setMessageError("Login não informado")
            handleShowError()
        } else
            if ((!password) || (!confirmPassword)) {
                setMessageError("Informe todos os dados")
                handleShowError()
            }
            else
                if (!(password == confirmPassword)) {
                    setMessageError("A senha não confere")
                    handleShowError()
                } else
                    setHidden(!hidden);
    }

    const getData = () => {
        api.get(`store/${id}`)
            .then(response => {
                setStore(response.data)
                setName(response.data.name)
                setType(response.data.type)
                setCep(response.data.cep)
                setNumber(response.data.number)
                setInstagram(response.data.instagram)
                setFacebook(response.data.facebook)
                GetAddress(response.data.cep)
            });
    }

    function GetAddress(cep) {
        if (cep.length > 0) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    setAddress(response.data.logradouro)
                    setCity(response.data.localidade)
                    setUf(response.data.uf)
                    setDistrict(response.data.bairro)
                })
                .catch((error) => {
                    alert('Informe um CEP válido!')
                });
        } else {
            // setAddress([])
            // setCity("")
            // setUf('')
            // setDistrict('')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleCreateStore();
    }

    async function handleCreateStore() {
        const data = {
            cep,
            email,
            facebook,
            instagram,
            name,
            number,
            password,
            phoneNumber,
            type
        };
        try {
            await api.post('store', data)
                .then(response =>
                    handleShow()
                );
        } catch (err) {
            console.log(data)
            setMessageError("Erro ao cadastrar o Estabelecimento")
            handleShowError()
        }
    }

    type HTMLElementEvent<T extends HTMLElement> = Event & {
        target: T;
    }

    function handleChange(event: HTMLElementEvent<HTMLButtonElement>) {
        const { target } = event
        console.log(target.value);
    }

    return (
        <>
            <div className="fundoStore">
                <Modal show={showCreate} onHide={handleCloseCreate} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Wish2Eat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Estabelecimento cadastrado! </Modal.Body>
                    <Modal.Footer>
                        <Link to="/Signin">
                            <button type="button" onClick={handleCloseCreate} >
                                OK
                            </button>
                        </Link>
                    </Modal.Footer>
                </Modal>

                <Modal show={showError} onHide={handleCloseError} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Wish2Eat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> {messageError} </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleCloseError}>
                            OK
                        </button>
                    </Modal.Footer>
                </Modal>

                <div className="linha">
                    <div className="left" >
                        <div className="divlogo">
                            <Logo />
                        </div>
                        <div className="titlewhite">
                            Cadastre-se
                        </div>
                        <div className="gologin">
                            <Link to="/Signin" >
                                <button type="button" className="buttonlogin">
                                    Fazer Login
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="right login" style={hidden ? styleProps : styleHidden}>
                        <div id="input">
                            <Input label="Login" name="login" requerid="requerid"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-password" id="input" >
                            <Input type="password" label="Senha" id="password" requerid="requerid"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-confirmpassword" id="input" >
                            <Input type="password" label="Confirmar Senha" id="passwordConfirm"
                                requerid="requerid"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="gologin">
                            <button type="button" onClick={onHidden} className="buttonlogin"> Próximo </button>
                        </div>

                    </div>

                    <div className="right 2" style={hidden ? styleHidden : styleProps}>
                        <form style={{ width: "100%" }} onSubmit={onSubmit} className="Form-Register">
                            <br />
                            <Row>
                                <div className="name">
                                    <Input type="text" label="Nome" id="name" requerid="requerid" name="name"
                                        value={name} onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="type">
                                    {/* <Input type="text" label="Tipo" id="tipo"
                                        value={type} onChange={(e) => setType(e.target.value)}
                                    /> */}
                                    <FormControl className={classes.formControl} //
                                    >
                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                            Tipo
                                        </InputLabel>
                                        <NativeSelect
                                            value={type}
                                            inputProps={{
                                                name: 'type',
                                                id: 'age-native-label-placeholder',
                                            }}
                                            onChange={event => handleChange}
                                        // setType(event.target.value)}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value="1">Ice Cream</option>
                                            <option value="2">Hamburgueria</option>
                                            <option value="3">Pizzaria</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                            </Row>
                            <Row>
                                <div className="address">
                                    <Input type="text" label="Logradouro" id="logradouro"
                                        value={address} onChange={e => setAddress(e.target.value)}
                                        disabled={true}
                                    />
                                </div>
                                <div className="number" >
                                    <Input type="text" label="Número" id="num"
                                        value={number} onChange={e => setNumber(e.target.value)}
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="district" >
                                    <Input type="text" label="Bairro" id="bairro"
                                        value={distric} onChange={e => setDistrict(e.target.value)}
                                        disabled={true}
                                    />
                                </div>
                                <div className="city" >
                                    <Input type="text" label="Município" id="municipio"
                                        value={city} onChange={e => setCity(e.target.value)}
                                        disabled={true}
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="uf" >
                                    <FormControl className={classes.formControl} disabled={true}>
                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                            Estado
                                        </InputLabel>
                                        <NativeSelect
                                            value={uf}
                                            inputProps={{
                                                name: 'uf',
                                                id: 'age-native-label-placeholder',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                                <div className="cep" >
                                    <Input type="text" label="CEP (Sem traço)" id="cep"
                                        value={cep} onChange={e => setCep(e.target.value)}
                                        onBlur={(e) => { GetAddress(cep) }}
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="input-tel" id="input">
                                    <Input type="text" label="Telefone" id="tel"
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="input-facebook" id="input" >
                                    <Input type="text" label="Facebook" id="facebook"
                                        value={facebook} onChange={e => setFacebook(e.target.value)}
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className="input-instagram" >
                                    <Input type="text" label="Instagram" id="instagram"
                                        value={instagram} onChange={e => setInstagram(e.target.value)}
                                    />
                                </div>
                            </Row>
                            <div className="formbutton">
                                <button type="button" onClick={onHidden} className="buttonBack">
                                    Voltar
                                </button>
                                <button
                                    type="submit"
                                    className="buttonregister"
                                // href="/Sigin"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </ div>
            </div>
        </>
    );
}

export default FormStore;
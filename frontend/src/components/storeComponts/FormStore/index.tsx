import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import api from '../../../services/api'
import Form from '../../Form'
import Input from '../../Input'
import NavBar from '../../Header'
import { makeStyles } from '@material-ui/core/styles'
import Row from 'react-bootstrap/Row'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel'
import { ReactComponent as Logo } from '../../../core/assests/ico/Wish2eat.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import Select from '@material-ui/core/Select'
import Modal from 'react-bootstrap/Modal'
import Load from '../../Load'
import './style.css'
import NotFound from '../../NotFound'
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const FormStore = () => {
    type StoreParams = {
        id: string;
    }
    const { id } = useParams<StoreParams>();

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

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
    const history = useHistory();
    const handleShow = () => {
        setShowCreate(true);
        // history.push(`/store/${id}/product`)
    }
    function handleShowError() {
        setShowError(true);
    }


    function GetAddress(cep) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
                setAddress(response.data.logradouro)
                setCity(response.data.localidade)
                setUf(response.data.uf)
                setDistrict(response.data.bairro)
            })
            .catch((error) => {
                // alert('O CEP está inválido!');
            });
    }
    const refresh = () => {
        api.get(`store/${id}`)
            .then(response => {
                setStore(response.data)
                setName(response.data.name)
                setCep(response.data.cep)
                setNumber(response.data.number)
                setInstagram(response.data.instagram)
                setFacebook(response.data.facebook)
                setPhoneNumber(response.data.phoneNumber)
                setEmail(response.data.email)
                setPassword(response.data.password)
                // setConfirmPassword(response.data.password)
                GetAddress(response.data.cep)
                setLoading(false);
            });
    }
    useEffect(() => {
        refresh();
    }, []);

    function Validation() {
        let aux = false;
        if (!name) {
            setMessageError("Informe o nome do Estabelecimento");
            aux = false;
        } else if (!type) {
            setMessageError("Informe o tipo do Estabelecimento");
            aux = false;
        } else if (!cep) {
            setMessageError("Informe o CEP do Estabelecimento");
            aux = false;
        } else if (!number) {
            setMessageError("Informe o número do Estabelecimento");
            aux = false;
        } else if (!phoneNumber) {
            setMessageError("Informe o Telefone do Estabelecimento");
            aux = false;
        } else if (!instagram) {
            setMessageError("Informe o Instagram do Estabelecimento");
            aux = false;
        } else if (!facebook) {
            setMessageError("Informe o Facebook do Estabelecimento");
            aux = false;
        } else if (!password) {
            setMessageError("Preencha todos os dados!");
            aux = false;
        } else if (!confirmPassword) {
            setMessageError("Preencha todos os dados!");
            aux = false;
        } else if (password != confirmPassword) {
            setMessageError("Senha não confere!");
            aux = false;
        } else {
            aux = true;
        }
        return aux;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    const handleSubmit = () => {
        if (!name) {
            setMessageError("Informe o nome do Estabelecimento");
            handleShowError()
        } else if (!type) {
            setMessageError("Informe o tipo do Estabelecimento");
            handleShowError()
        } else if (!cep) {
            setMessageError("Informe o CEP do Estabelecimento");
            handleShowError()
        } else if (!number) {
            setMessageError("Informe o número do Estabelecimento");
            handleShowError()
        } else if (!phoneNumber) {
            setMessageError("Informe o Telefone do Estabelecimento");
            handleShowError()
        } else if (!instagram) {
            setMessageError("Informe o Instagram do Estabelecimento");
            handleShowError()
        } else if (!facebook) {
            setMessageError("Informe o Facebook do Estabelecimento");
            handleShowError()
        } else if (!password) {
            setMessageError("Preencha todos os dados!");
            handleShowError()
        } else if (!confirmPassword) {
            setMessageError("Preencha todos os dados!");
            handleShowError()
        } else if (password != confirmPassword) {
            setMessageError("Senha não confere!");
            handleShowError()
        } else {
            handleUpdate();
        }
    }

    async function handleUpdate() {

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
            await api.put(`store/${id}`, data)
                .then(response => {
                    handleShow();
                });
        } catch (err) {
            alert('Update error')
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
            <div className="parent">
                <NavBar />
                <div className="conteudo">

                    {!loading ? (
                        <div>
                            <Modal show={showCreate} onHide={handleCloseCreate} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Wish2Eat</Modal.Title>
                                </Modal.Header>
                                <Modal.Body> Estabelecimento atualizado! </Modal.Body>
                                <Modal.Footer>                                    
                                    <Link to={`/store/${id}/product`}>
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

                            <div className="row">
                                <form className="Form-Register" onSubmit={onSubmit}
                                >
                                    <div className="title">
                                        Editar Estabelecimento
                                    </div>
                                    <br />
                                    <Row>
                                        <div className="input-name" id="input">
                                            <Input type="text" label="Nome" id="name" requerid="requerid" name="name"
                                                value={name} onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
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
                                    </Row>
                                    <Row>
                                        <div className="input-cep" id="input">
                                            <Input type="text" label="CEP (Sem traço)" id="cep"
                                                value={cep} onChange={e => setCep(e.target.value)}
                                                onBlur={(e) => { GetAddress(cep) }}
                                            />
                                        </div>
                                        <div className="input-end">
                                            <Input type="text" label="Logradouro" id="logradouro"
                                                value={address} onChange={e => setAddress(e.target.value)}
                                                disabled={true}
                                            />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="input-num" id="input">
                                            <Input type="text" label="Número" id="num"
                                                value={number} onChange={e => setNumber(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-cidade" id="input">
                                            <Input type="text" label="Município" id="municipio"
                                                value={city} onChange={e => setCity(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-bairro" id="input">
                                            <Input type="text" label="Bairro" id="bairro"
                                                value={distric} onChange={e => setDistrict(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-uf" >
                                            <FormControl className={classes.formControl} id="form-select">
                                                {/* <InputLabel htmlFor="grouped-native-select" className="label">
                                            Estado
                                        </InputLabel> */}
                                                <Select native id="grouped-native-select"
                                                    value={uf}
                                                //onChange={e => setUf(e.target.value)}
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
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="input-tel" id="input">
                                            <Input type="text" label="Telefone" id="tel"
                                                value={phoneNumber}
                                                onChange={e => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-facebook" id="input" >
                                            <Input type="text" label="Facebook" id="facebook"
                                                value={facebook} onChange={e => setFacebook(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-instagram" >
                                            <Input type="text" label="Instagram" id="instagram"
                                                value={instagram} onChange={e => setInstagram(e.target.value)}
                                            />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="input-login" id="input">
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
                                            <Input type="password" label="Confirmar Senha" id="passwordConfirm" requerid="requerid"
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </Row>
                                    <div className="buttonsubmit">
                                        <button type="submit" >
                                            Editar Estabelecimento
                                        </button>
                                    </div>
                                </form>
                            </ div>
                        </div>
                    ) : (
                        <Load loading={loading} />
                    )}
                </div>
            </div>
        </>
    );
}

export default FormStore;
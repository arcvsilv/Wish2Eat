import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import NavBar from '../../components/Header'
import Input from '../../components/Input'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import './style.css'

const ProductForm = ({ update }) => {

    type StoreParams = {
        id: string;
        idproduct: string;
    }
console.log("tosqui")
    const { id } = useParams<StoreParams>();
    const { idproduct } = useParams<StoreParams>();
    const [storeID, setStoreID] = useState("");
    const [name, setName] = useState();
    const [value, setValue] = useState();
    const [description, setDescription] = useState("");
    const [inserted, setInserted] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showError, setShowError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [messageError, setMessageError] = useState('');
    const handleCloseCreate = () => setShowCreate(false);
    const handleCloseError = () => setShowError(false);

    const handleShow = () => {
        setShowCreate(true)
        setInserted(true)
    };
    function handleShowError() {
        setShowError(true);
    }

    function getButtonText() {
        return Object.keys(update).length > 1 ? "Alterar" : "Adicionar";
    }

    function getTitle() {
        return Object.keys(update).length > 1 ? "Alterar Produto" : "Adicionar Produto";
    }

    function getTitleText() {
        return Object.keys(update).length > 1 ? "Produto alterado!" : "Produto cadastro!";
    }

    useEffect(() => {
        if ((Object.keys(update).length > 1)) {
            refresh(idproduct);
        } else {
            setStoreID(id)
        }
    }, []);

    const refresh = (idproduct) => {
        console.log(idproduct)
        api.get(`product/${idproduct}`)
            .then(response => {
                setName(response.data.name)
                setStoreID(response.data.storeID)
                setValue(response.data.value)
                setDescription(response.data.description)
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    function handleSubmit() {
        if (!name) {
            setMessageError("Nome do Produto não informado!")
            handleShowError()
        } else
            if ((value === 0) || (!value)) {
                setMessageError("Valor / Preço não informado!")
                handleShowError()
            } else
                if (!description) {
                    setMessageError("Descrição não informada!")
                    handleShowError()
                } else {
                    setHidden(!hidden);
                    if (!(Object.keys(update).length > 1)) {
                        handleCreateProduct();
                    } else {
                        handleUpdate();
                    }
                }
    }

    async function handleCreateProduct() {
        const data = {
            name,
            value,
            description,
            storeID
        };

        try {
            await api.post('product', data)
                .then(response =>
                    handleShow(),
                );
        } catch (err) {
            console.log(data);
            setMessageError("Erro ao cadastrar o Novo Produto")
            handleShowError()
        }
    }

    async function handleUpdate() {
        const data = {
            name,
            value,
            description,
            storeID
        };

        try {
            await api.put(`product/${idproduct}`, data)
                .then(response =>
                    handleShow(),
                );
        } catch (err) {
            setMessageError("Erro ao atualizar o Novo Produto")
            handleShowError()
        }
    }

    return (
        <div className="parent">
            < NavBar />
            <div className="conteudo">
                <div className="Productcenter">
                    <Modal show={showCreate} onHide={handleCloseCreate} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Wish2Eat</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> {getTitleText()} </Modal.Body>
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

                    <form onSubmit={onSubmit}>
                        <div className="title">  {getTitle()} </div>
                        <div className="center">
                            <Input id="name" label="Nome" 
                                placeholder="X-Tudo"
                                value={name} onChange={e => setName(e.target.value)}
                            />
                            <Input id="price" label="Preço" 
                                placeholder="R$1.00"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />

                            <Form.Group className="ControlInput">
                                <Form.Label className="controllabel">Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                />
                            </Form.Group>
                        </div>
                        <button type="submit">
                            {getButtonText()}
                        </button> 
                    </form>
                </div>
            </div>
        </div >
    );
}

export default ProductForm;

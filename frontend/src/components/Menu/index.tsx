import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import api from '../../services/api';
import Modal from 'react-bootstrap/Modal'
import './style.css';

const useStyles = makeStyles((props) => ({
    admin: {
        margin: '2vh 2vh 2vh 2vh',
        borderBottom: 'unset',
        display: 'flex',
        justifyContent: 'space-between',
        height: '85vh',
        boxShadow: '2px 3px 8px 3px rgb(126, 126, 126)'
    },
    client: {
        margin: '2vh 2vh 2vh 2vh',
        borderBottom: 'unset',
        display: 'flex',
        justifyContent: 'space-between',
        height: '45vh',
        boxShadow: '2px 3px 8px 3px rgb(126, 126, 126)'
    },
    scrollbarAdmin: {
        height: '75vh',
        overflowY: 'scroll',
    },
    scrollbarClient: {
        height: '35vh',
        overflowY: 'scroll',
    }
}));


const Menu = (props: { admin: Boolean }) => {
    type StoreParams = {
        id: string;
    };
    const { id } = useParams<StoreParams>();

    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [currentProduct, setCurrentProduct] = useState("");
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [idProduct, setIdProduct] = useState();
    const [name, setName] = useState();
    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);

    const retrieveProduct = (id) => {
        api.get(`store/${id}`)
            .then(response => {
                setProduct(response.data.products);
            });
    }
    let admin = props.admin;

    useEffect(() => {
        retrieveProduct(id);
    }, []);

    const refreshList = () => {
        retrieveProduct(id);
        setCurrentProduct("");
        setCurrentIndex(-1);
    };

    const setActiveProduct = (product, index) => {
        setCurrentProduct(product)
        setIdProduct(product.id)
        setName(product.name)
        setValue(product.value)
        setDescription(product.description)
        setCurrentIndex(index)
    };

    const handleDelete = (id) => {
        console.log('e' + id)
        api.delete(`product/${id}`)
            .then(response => {
                setShowCreate(true);
                refreshList();                
            })
    }

    return (
        <>
            <div className={
                admin ? (classes.admin) : (classes.client)
            } >
                <Modal show={showCreate} onHide={handleCloseCreate} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Wish2Eat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Produto Excluído! </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={handleCloseCreate} >
                            OK
                        </button>
                    </Modal.Footer>
                </Modal>

                <div className="grid-scroll">
                    <h4 className="menu-title">Cardápio</h4>
                    <div className={admin ? (classes.scrollbarAdmin) : (classes.scrollbarClient)}>
                        <List component="nav" aria-label="main mailbox folders">
                            {product &&
                                product.map((product: any, index: number) => (
                                    <ListItem
                                        button
                                        className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                        onClick={() => setActiveProduct(product, index)}
                                        key={index}
                                    >
                                        <ListItemText primary={product.name} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </div>

                <div className="grid-product">
                    {currentProduct ? (
                        <div>
                            <h4 className="menu-title">Produto</h4>
                            <div className="product-select">
                                <div>
                                    <label>
                                        <strong>Nome:</strong>
                                    </label>{" "}
                                    {name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Preço:</strong>
                                    </label>{" "}
                                    {value}
                                </div>
                                <div>
                                    <label>
                                        <strong>Descrição:</strong>
                                    </label>{" "}
                                    {description}
                                </div>
                                {admin ?
                                    <div className="buttons-update-Delete">
                                        <Link
                                            to={{ pathname: `/store/${id}/product/${idProduct}/update` }}
                                            className="buttons UpdateDelete"
                                        >
                                            <button type="button" className="buttonUpdate">
                                                <EditIcon /> Editar
                                            </button>
                                        </Link>
                                        <div className="buttons UpdateDelete">
                                            <button type="button" className="buttonDelete" onClick={() => handleDelete(idProduct)}>
                                                <DeleteIcon /> Excluir
                                            </button>
                                        </div>
                                    </div>
                                    : ""}
                            </div>
                        </div>

                    ) : (
                        <div className="product-select">
                            <br />
                            <p>Clique em um produto...</p>
                        </div>
                    )}
                </div>
                {admin ?
                    <div className="new-product">
                        <Link
                            to={{ pathname: `/store/${id}/product/insert` }}
                        >
                            <button type="button" className="button-newproduct">
                                Novo Produto
                            </button>
                        </Link>
                    </div> :
                    ""
                }
            </div>
        </>
    );
}

export default Menu;
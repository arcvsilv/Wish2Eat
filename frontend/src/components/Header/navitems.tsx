import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import api from '../../services/api';
import { GlobalContext } from '../Context';
import '../../css/style.css';
import './style.css';

const ITEM_HEIGHT = 48;

const NavItems = ({ logado }) => {
    type StoreParams = {
        id: string;
    }
    const { id } = useParams<StoreParams>();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const global = React.useContext(GlobalContext);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseLogout = () => {
        setAnchorEl(null);
        global.setStoreLogada(null);
        history.push('/');
    }

    const handleDeleteStore = () => {
        api.delete(`store/${id}`)
            .then(response => {
                setAnchorEl(null);
            })
    };
    
    if ( (global.storeLogada != undefined) && (global.storeLogada != null)) {
        return (
            <>
                <ul className="navbar-nav ml-auto ">
                    <Link className="link" to={{ pathname: `/store/${id}/product` }}>
                        <ListItem button key='Cardápio'>
                            <ListItemIcon> <MenuBookRoundedIcon className="icon" />  </ListItemIcon>
                            <ListItemText primary='Cardápio' />
                        </ ListItem>
                    </Link>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <Link className="link" to={{ pathname: `/store/${id}/update` }}>
                            <MenuItem key="profile"
                                onClick={handleClose}>
                                Profile
                            </MenuItem>
                        </Link>
                        <MenuItem key="profile"
                            onClick={handleDeleteStore}>
                            Excluir Cadastro
                        </MenuItem>
                        <MenuItem key="Logout"
                            onClick={handleCloseLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
                </ul>
            </>
        );
    }
    else {
        return (
            <>
                <ul className="navbar-nav ml-auto ">
                    <Link className="link" to="/" >
                        <ListItem button key='Home' >
                            <ListItemIcon> <HomeRoundedIcon className="icon" />  </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ ListItem>
                    </Link>
                    <Link className="link" to="/storelist" >
                        <ListItem button key='Estabelecimentos' >
                            <ListItemIcon> <LocalDiningRoundedIcon className="icon" />  </ListItemIcon>
                            <ListItemText primary='Estabelecimentos' />
                        </ ListItem>
                    </Link>
                    <Link className="link" to={"/signin"}>
                        <ListItem button key='Login' >
                            <ListItemIcon> <ExitToAppRoundedIcon className="icon" />  </ListItemIcon>
                            <ListItemText primary='Login' />
                        </ ListItem>
                    </Link>
                </ul>
            </>
        );
    }
}

export default NavItems;
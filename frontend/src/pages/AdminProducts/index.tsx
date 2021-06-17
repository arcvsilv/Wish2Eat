import React from 'react'
import NavBar from '../../components/Header'
import Menu from '../../components/Menu'

const AdminProducts = () =>{
    
    return (
        <div className="parent">
            < NavBar />
            <div className="conteudo">
                <Menu admin={true} />
            </div>
        </div>
    );
}

export default AdminProducts
import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { ReactComponent as Logo } from '../../core/assests/ico/logo.svg'
import { Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import api from "../../services/api"
import { GlobalContext } from '../../components/Context';
import './style.css'

const Login = () => {
    const [store, setStore] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const global = React.useContext(GlobalContext);

    async function handleSignIn(){
        const data = {
            email,
            password
        };

        if (!email || !password) {
            alert("Preencha e-mail e senha para continuar!");
        } else {
            try {
                console.log(data)
                await api.post('store/login', data)
                      .then(response => {
                        setStore(response.data);
                        global.setStoreLogada(response.data);                        
                        history.push(`/store/${response.data.id}/product`)
                    });
            } catch (err) {
                console.log(err)
                alert("Houve um problema com o login, verifique suas credenciais. T.T");
            }
        }
    }

    return (
        <>
            <div className="fundo">
                <div className="content">
                    <div className="formlogin" >
                        <div className="headerlogo">
                            <Logo />
                        </div>
                        <div >
                            <PersonIcon />
                            <label htmlFor="user" className="label">
                                USUÁRIO
                            </label>
                            <input id="email" name="email" type="text"
                                placeholder="contato@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div >
                            <LockIcon />
                            <label htmlFor="password" className="label">
                                SENHA
                            </label>
                            <input id="password" name="password" type="password" placeholder="1234"
                                value={password}                           
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit"
                            className="submitbutton"
                            onClick={handleSignIn}
                        >
                            ENTRAR
                        </button>
                        <label className="forgotpassword" >ESQUECEU SUA SENHA? </label>
                    </div>
                    <div className="register">
                        <label className="label"> Ainda não tem conta? </label>
                        <Link to="/registerStore">
                            <label className="label"> Cadastre-se </label>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

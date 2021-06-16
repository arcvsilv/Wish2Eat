import React from 'react'
import NavBar from '../../components/Header';
import { ReactComponent as Logo } from '../../core/assests/ico/logo.svg'
import {GlobalContext} from '../../components/Context'
import './style.css'


const Home = () => {

    const global = React.useContext(GlobalContext);
    
    function handleClick(){
        global.setStoreLogada(false);
    }

    return (
        // <p>Home</p>
        <div className="parent">
            < NavBar />
            <div className="conteudo">
                <div className="homecontainer" >
                    <div className="about">
                        <Logo />
                        <p> Ao tratar-se de recomendar e lista de desejos de lanches, estabelecimentos,
                            alimentos e produtos da área alimentícia, os meios para o mesmo são quase não
                            identificados. Em sua maioria são realizados pela famosa “boca-a-boca” e por
                            redes sociais, que não possuem um foco para tal. </p>
                        <p> Por tanto, acreditamos que a Wish2Eat com foco em recomendações e lista de
                            desejo, seja a melhor opção e solução para este caso, pois assim, de forma
                            simples, pode-se organizar e armazenar locais e produtos de seu interesse,
                            facilitando a transição de informações e gerenciamento do mesmo. </p>
                        <div>
                            <button type="button" className="downloadApp">
                                Baixar App
                            </button>
                        </div>
                    </div>
                    <div className="imgcel" />
                </div>
            </div>
        </div>
    );
}

export default Home;
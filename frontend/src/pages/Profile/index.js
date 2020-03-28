import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([])

    const history = useHistory();
    
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName'); // Guardando o nome da ong que foi utilizado o id

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]) // ( vai carregar a função para carregar os casos e depois quais funções serão executadas)

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id)); {/**faz uma busca no array de acidentes e da uma varredura, procurar o que tem o mesmo ID e removelo do array */}
        }catch(err){
            alert('Erro ao deletar esse caso, tente noamente.');
        }
    }

    function handleLogout(){
        localStorage.clear() // limpando todo historico
        history.push('/')

    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02141"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
               {incidents.map(incident => (
                   <li key={incident.id}>
                       <strong>CASO:</strong>
                       <p>{incident.title}</p>

                       <strong>DESCRIÇÃO:</strong>
                       <p>{incident.description}</p>

                       <strong>VALOR:</strong>
                       <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</p> {/* Passando parametros para um certo tipo de escrita, fazendo com que o valor fiquei em REAIS(R$)  */}

                       <button onClick={() => handleDeleteIncident(incident.id)} type="button"> {/* Está sendo passado uma função, e não o retorno de uma função */}
                            <FiTrash2 size={20} color="#a8a8b3"/>
                       </button>
                       </li>
               ))}
            </ul>
        </div>
    );
}
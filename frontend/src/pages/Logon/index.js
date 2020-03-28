import React, {useState} from 'react'; // importando o react e algumas de suas funções 
import {Link, useHistory} from 'react-router-dom'; // fazendo com que as URLS converse entre si, sem precisar fazer atualização na pagina toda fez que for adicionado ou excluido elemtos
import {FiLogIn} from 'react-icons/fi'; // importação de icones

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
	const [id, setId] = useState(''); // [valor, função que atualiza o valor]
	const history = useHistory(); 

	async function handleLogin(e){
        e.preventDefault();

        try{
			const response = await api.post('sessions', {id});

			localStorage.setItem('ongId', id); // grava na memoria do navegador
			localStorage.setItem('ongName', response.data.name); // grava na memoria do navegador

			history.push('/profile'); // direciona para o local desejado ()
        }catch(err){
			alert('Falha no login, tente novamente.')
		}
}
	return(
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="" className="Be The Hero"/>

				<form onSubmit={handleLogin}>
					<h1>Faça seu Logon</h1>

					<input 
						placeholder="Sua ID"
						value={id}
						onChange={e => setId(e.target.value)}
					/> {/* onChange ouve o valor e executa uma função*/}

					<button className="button" type="submit">Entrar</button>

					<Link className="back-link" to="/register"> 
						<FiLogIn size={16} color="#E02041"/>
						Não tenho cadastro
					</Link>
				</form>
			</section>
		    <img src={heroesImg} alt="Heroes" />
		</div> 	
	);
}
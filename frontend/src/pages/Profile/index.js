import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo_dm.svg'

import './styles.css'

export default function Profile(){
    
    const [incidents, setIncidents] = useState([])
    
    const history = useHistory()

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then( response => {
            setIncidents(response.data)
            console.log(incidents)
        })
    }, [ongId])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err){
            alert('Erro ao deletar, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={handleLogout} size={18} color='#E02041'/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map( incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p className="formatCase">{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p className="formatDescription">{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#000000" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}
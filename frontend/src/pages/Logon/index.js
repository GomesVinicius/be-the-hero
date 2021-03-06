import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi' 

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo_dm.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){

    const history = useHistory()
    const [id, setId] = useState('')

    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await api.post('sessions', {id})

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (err){
            alert('Falha no Login, tente novamente')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1 className="text">Faça seu logon</h1>

                    <input placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        <p className="text">{'\u00A0'}Não tenho cadastro</p>
                    </Link>
                </form>

            </section>                
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
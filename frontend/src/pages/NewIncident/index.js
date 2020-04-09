import React, { useState } from 'react'

import logoImg from '../../assets/logo_dm.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'

export default function NewIncident(){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId = localStorage.getItem('ongId')
    const history = useHistory()

    async function handleNewIncident(e){
        e.preventDefault()

        const data ={
            title,
            description,
            value
        }

        if(!isNaN(value) && title && description && value !== 0){
            try{
                await api.post("/incidents", data, {
                    headers: { Authorization: ongId }
                })

                history.push('/profile')}
            catch{
                alert('Erro ao cadastrar caso, tente novamente')
            }
        }
        else {
            alert('Preencha corretamente os campos')
        }
        
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver o caso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        <p>Voltar para home</p>
                    </Link>

                </section>
                <form>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea  
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" onClick={handleNewIncident} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
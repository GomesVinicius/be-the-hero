import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import '../../global.css'

import api from '../../services/api'
import apiLocation from '../../services/servicesLocation/api'

import logoImg from '../../assets/logo_dm.svg'

export default function Register(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [wpp, setWpp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    useEffect( () => {
        apiLocation.get().then(response => {
            setApiUf(response.data)
        })
    }, [])

    /*useEffect( () => {
        apiLocation.get(`${dadosUfProvisiorio[2]}/distritos`).then(response => {
            setApiCidade(response.data)
        })
    }, [])*/

    async function handleRegister(e){
        e.preventDefault()

        const data = ({
            name,
            email,
            wpp,
            city,
            uf,
        })

        try{
            const response = await api.post('ongs', data)
            console.log(response)
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/')
        } catch(err) {
            alert('Erro no cadastro, tente novamente')
        }
        
    }

    const [apiUf, setApiUf] = useState([])

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        <p>Não tenho cadastro</p>
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp" 
                        value={wpp}
                        onChange={e => setWpp(e.target.value)}
                    />

                    <div className="input-group">

                    <select
                        onChange={ (e) => {setUf(e.target.value)}}
                    >
                        <option value=""></option>
                        {apiUf.map( uf => (
                            <option
                             key={uf.id}
                             value={uf.sigla}
                             >
                                {uf.sigla}
                            </option>
                        ))}
                    </select>

                    <input placeholder="Cidade" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
/*
<select
    name="uf"
    onChange={ e => {
        setUf(e.target.value.sigla)
        setMostraUF(e.target.value.id)
        console.log('mostraUF', e.target.value)
    }}
>
    <option></option>
    {ufT.map( uf => (
        <option
            value={uf}
            key={uf.id}
            style={{ width: 80 }}
        >{uf.sigla}</option>
    ))}
</select>

<select
    name="city"
>
    <option></option>
</select>

<input type="text" onChange={e => {
    setCity(e.target.value)
    }}/>
*/
import axios from 'axios'
//retonra cidade
//https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/distritos
//retorna UF
//https://servicodados.ibge.gov.br/api/v1/localidades/estados/11
const api = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
})

export default api
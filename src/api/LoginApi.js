//Arquivo responsavel por fazer a requisição para a API

import { apiFetch } from '../service/httpClient'

//Função que interaje com o login
export function LoginApi(email, password){

    //Objeto com os elementos
    let credenciais = {
	    email: email,
	    password: password
    }

    //Login não exige token (o usuário ainda não está autenticado), por isso auth: false
    return apiFetch('/login', {
        method: 'POST',
        body: credenciais,
        auth: false,
    })
}

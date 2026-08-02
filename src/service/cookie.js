//Arquivo responsavel por lidar com os cookies para o token de autortização

//Importando a biblioteca para interagir com o cookie
import Cookies from 'js-cookie'

//Função responsavel por criar o cookie para salvar o token
function SetCookie(authorizationToken){

    //Crinado o cookie
    Cookies.set(
        'token', //Nome do cookie
        authorizationToken, //Valor do cookie
        //Atributos do token
        {
            expires: 7, //Define data de expiração
            secure: true, // Só será enviado em conexões HTTPS
            sameSite: 'strict' // Protege contra ataques CSRF
        }
    )
}

//Função responsavel por recuperar o cookie
function GetCookie(){

    //Pegando o token
    let token = Cookies.get('token')

    //Retornando o token
    return token
}

//Função responsavel por deletar o cookie
function DeleteCookie(){

    //Deletando o token
    Cookies.remove('token')
}

//Função responsavel por verificar se o cookie já existe e subisti-lo por um mais novo
function HendleCookie(token){

}

//Exportando as funções do Cookie
export {SetCookie, GetCookie, DeleteCookie, HendleCookie}
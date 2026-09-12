//Arquivo responsavel por lidar com os cookies para o token de autortização

//Importando a biblioteca para interagir com o cookie
import Cookies from 'js-cookie'

//Em desenvolvimento local o site normalmente roda em "http://localhost" (sem HTTPS).
//Se o cookie for marcado como "secure: true" nesse cenário, o navegador simplesmente
//recusa salvar o cookie, e o login "funciona" na API mas o token nunca fica salvo no front.
//Por isso o atributo "secure" só é ativado quando o site realmente está em HTTPS.
const conexaoSegura = typeof window !== 'undefined' && window.location.protocol === 'https:'

//Função responsavel por criar o cookie para salvar o token
function SetCookie(authorizationToken, tipoUsuario){

    //Crinado o cookie
    Cookies.set(
        'token', //Nome do cookie
        authorizationToken, //Valor do cookie
        //Atributos do token
        {
            expires: 7, //Define data de expiração
            secure: conexaoSegura, // Só exige HTTPS quando o site estiver rodando em HTTPS
            sameSite: 'strict' // Protege contra ataques CSRF
        }
    )

    //Crinado o cookie
    Cookies.set(
        'tipo', //Nome do cookie
        tipoUsuario, //Valor do cookie
        //Atributos do token
        {
            expires: 7, //Define data de expiração
            secure: conexaoSegura, // Só exige HTTPS quando o site estiver rodando em HTTPS
            sameSite: 'strict' // Protege contra ataques CSRF
        }
    )
}

//Função responsavel por recuperar o cookie
function GetCookie(){

    //Pegando o token
    let token = Cookies.get('token')
    let tipo = Cookies.get('tipo')

    //Retornando o token
    return {token: token, tipo: tipo}
}

//Função responsavel por deletar o cookie
function DeleteCookie(){

    //Deletando o token
    Cookies.remove('token')
    Cookies.remove('tipo')
}

//Função responsavel por verificar se o cookie já existe e subisti-lo por um mais novo
function HendleCookie(token){

}

//Exportando as funções do Cookie
export {SetCookie, GetCookie, DeleteCookie, HendleCookie}
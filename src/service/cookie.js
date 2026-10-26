//Arquivo responsavel por lidar com os cookies para o token de autortização

//Importando a biblioteca para interagir com o cookie
import Cookies from 'js-cookie'

//Função responsavel por criar o cookie para salvar o token
function SetCookie(authorizationToken, tipoUsuario){

    //Crinado o cookie
    Cookies.set(
        'token', //Nome do cookie
        authorizationToken, //Valor do cookie
        //Atributos do token
        {
            expires: 7, //Define data de expiração
            secure: window.location.protocol === 'https:', // Só será enviado em conexões HTTPS
            sameSite: 'lax' // Protege contra ataques CSRF
        }
    )

    //Crinado o cookie
    Cookies.set(
        'tipo', //Nome do cookie
        tipoUsuario, //Valor do cookie
        //Atributos do token
        {
            expires: 7, //Define data de expiração
            secure: window.location.protocol === 'https:', // Só será enviado em conexões HTTPS
            sameSite: 'lax' // Protege contra ataques CSRF
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

//Função responsavel por marcar se o usuário ainda precisa concluir o primeiro acesso
function SetPrimeiroAcessoPendente(pendente){

    //Com o primeiro acesso pendente, guarda a marca | Concluído, remove a marca
    if(pendente){

        Cookies.set(
            'primeiroAcesso', //Nome do cookie
            'pendente', //Valor do cookie
            {
                expires: 7, //Define data de expiração
                secure: window.location.protocol === 'https:', // Só será enviado em conexões HTTPS
                sameSite: 'lax' // Protege contra ataques CSRF
            }
        )
    }
    else{

        Cookies.remove('primeiroAcesso')
    }
}

//Função responsavel por verificar se o primeiro acesso ainda está pendente
function GetPrimeiroAcessoPendente(){

    return Cookies.get('primeiroAcesso') === 'pendente'
}

//Função responsavel por deletar o cookie
function DeleteCookie(){

    //Deletando o token
    Cookies.remove('token')
    Cookies.remove('tipo')
    Cookies.remove('primeiroAcesso')
}

//Função responsavel por verificar se o cookie já existe e subisti-lo por um mais novo
function HendleCookie(token){

}

//Exportando as funções do Cookie
export {SetCookie, GetCookie, DeleteCookie, HendleCookie, SetPrimeiroAcessoPendente, GetPrimeiroAcessoPendente}
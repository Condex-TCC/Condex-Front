// Componente responsável por proteger as rotas que exigem login.
//
// Antes, qualquer pessoa conseguia acessar "/porteiro", "/sindico" etc. digitando a URL
// diretamente, sem nenhum token — não havia nenhum tipo de verificação. Esse componente
// resolve isso: ele funciona como um "portão" na frente de cada layout protegido.
//
// Uso (dentro do router.jsx):
//   {
//     path: "porteiro",
//     element: <RotaProtegida tipoPermitido="porteiro"><PorteiroLayout /></RotaProtegida>,
//     children: [...]
//   }

import { Navigate, useLocation } from "react-router-dom"
import { GetCookie } from "../service/cookie"

function RotaProtegida({ tipoPermitido, children }) {

    const localizacao = useLocation()

    //Recupera o token e o tipo de usuário salvos no cookie após o login
    //(o valor de "tipo" vem exatamente como a API devolve: "Sindico", "Morador" ou "Porteiro" — com a primeira letra maiúscula)
    const { token, tipo } = GetCookie()

    //Sem token: o usuário não está logado, manda para a tela de login
    if (!token) {

        //"replace" evita que o usuário consiga voltar para a rota protegida pelo botão "voltar"
        //"state" guarda de onde o usuário veio, para futuramente redirecionar de volta após o login
        return <Navigate to="/login" replace state={{ de: localizacao }} />
    }

    //Com token, mas de um tipo de usuário diferente do exigido por essa rota
    //(ex: um morador tentando acessar "/porteiro" diretamente pela URL)
    if (tipoPermitido && tipo !== tipoPermitido) {

        return <Navigate to="/login" replace />
    }

    //Usuário autenticado e do tipo correto: libera o acesso normalmente
    return children
}

export default RotaProtegida

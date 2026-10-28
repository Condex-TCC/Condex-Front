//Hooks que ligam a barra de pesquisa do header às páginas de cada layout

import { useEffect, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'

//Usado pelos layouts (síndico, morador e porteiro): guarda o texto da barra de pesquisa
//O texto vale só para a página em que foi digitado e some ao navegar para outra,
//sem precisar de useEffect, porque o caminho (pathname) é guardado junto com o texto
export function useBuscaDoLayout(){

    const { pathname } = useLocation()
    const [estado, setEstado] = useState({ texto: '', caminho: pathname })

    //Se a página mudou desde a digitação, a busca volta a ficar vazia
    const busca = estado.caminho === pathname ? estado.texto : ''

    const setBusca = (texto) => setEstado({ texto, caminho: pathname })

    return { busca, setBusca }
}

//Usado pelas páginas com lista: devolve o texto da barra de pesquisa do header
//"termo" espera um instante depois da última tecla para não refazer a lista a cada letra
export function useBuscaHeader(atrasoMs = 250){

    const contexto = useOutletContext() ?? {}
    const busca = contexto.busca ?? ''

    const [termo, setTermo] = useState(busca)

    useEffect(() => {

        const temporizador = setTimeout(() => setTermo(busca), atrasoMs)

        return () => clearTimeout(temporizador)
    }, [busca, atrasoMs])

    return { busca, termo }
}

//Arquivo responsavel por intermediar a lógica entre a tela que de controle de usuários pelo sindico e a API

import { deleteMoradores, getMoradores, insertMoradorAPI, showMoradorAPI, updateMoradorAPI, vefifyMoradorAPI } from "../api/MoradoresApi"
import { deletePorteirosAPI, getPorteiro, insertPorteiroAPI, showPorteiroAPI, updatePorteiroAPI } from "../api/PorteiroApi"


//Função responsavel por realizar o login
export async function LoadindUsers(tipoUser){

    //Tendanto executar a requisição
    try{

        //Variável que irá armazenar o usuários recuperados
        let users = null

        //Verifica qual tipo de usuário é
        if(tipoUser === "morador"){

            //Chama a promessa e pausa a execução dessa função até que termine de carregar a função
            users = await getMoradores()

        }else if(tipoUser === "porteiro"){

            //Chama a promessa e pausa a execução dessa função até que termine de carregar a função
            users = await getPorteiro()

        }else{

            //Para a execução do try e lança um erro para o catch
            throw("Não foi possivel carregar o usuário")
            
        }

        //Convertendo o json em objeto javaScrip
        const dados = await users.json()

        //Desestrutura o promisse
        const { message, status, data} = dados

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retorna os dados da requisição
        return data

    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        alert(erro)

    }
}

//Função que realiza o delete do morador
export async function deleteMorador(id) {
    
    //Tendanto executar a requisição
    try{
        //Chamando a função que realiza a requisição no API
        let response = await deleteMoradores(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

       
        //Verifica se houve algum erro na requisição (tanto no HTTP quanto no corpo da resposta).
        //É aqui que cai, por exemplo, quando o backend recusa o delete porque esse morador
        //ainda tem algum registro vinculado a ele (visitante, encomenda, autorização, etc.)
        if(!response.ok || status != 200){
 
            //Para a execução do try e lança para o catch a mensagem que veio do backend
            //(ex: "Não é possível apagar esse morador porque existem registros vinculados a ele")
            throw(message || ("Erro na requisição " + status))
        }
 
        //Retorna sucesso, para o componente saber que pode remover a linha da tabela
        return { sucesso: true, mensagem: message }
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Mostra o erro real no console (útil para debug técnico)
        console.error("Erro ao deletar morador:", erro)
 
        //Retorna falha e a mensagem para ser exibida ao síndico em um alert
        //explicando por que o morador não pôde ser excluído
        return { sucesso: false, mensagem: "Não foi possivel deletar o Morador" }

    }

}

//Função que realiza o delete do porteiro
export async function deletePorterio(id) {
    
    //Tendanto executar a requisição
    try{
        //Chamando a função que realiza a requisição no API
        let response = await deletePorteirosAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição (tanto no HTTP quanto no corpo da resposta).
        //É aqui que cai, por exemplo, quando o backend recusa o delete porque esse porteiro
        //ainda tem encomendas (ou outro registro) vinculadas a ele
        if(!response.ok || status != 200){
 
            //Para a execução do try e lança para o catch a mensagem que veio do backend
            //(ex: "Não é possível apagar esse porteiro porque existem encomendas vinculadas a ele")
            throw(message || ("Erro na requisição " + status))
        }
 
        //Retorna sucesso, para o componente saber que pode remover a linha da tabela
        return { sucesso: true, mensagem: message }
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

       //Mostra o erro real no console (útil para debug técnico)
        console.error("Erro ao deletar porteiro:", erro)
 
        //Retorna falha e a mensagem para ser exibida ao síndico em um alert
        //explicando por que o porteiro não pôde ser excluído
        return { sucesso: false, mensagem: "Não foi possivel deletar o porteiro!" }

    }

}

//Função que realiza a gravação no porteiro
export async function criandoPorteiro(nome, email, password) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await insertPorteiroAPI(nome, email, password)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a menssagem
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        alert(erro)

    }

}

//Função que obtem os dados do porteiro
export async function obtendoPorteiro(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await showPorteiroAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a menssagem
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar o porteiro na API:", erro)

    }

}

//Função que atualiza o porteiro
export async function atualizaPorteiro (id, nome, email, password) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await updatePorteiroAPI(nome, email, password, id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição
        if(status != 200){

            //Para a execução do try e lança um erro para o catch
            throw("Erro na requisição " + status)
        }

        //Retornando a menssagem
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar o porteiro na API:", erro)

    }

}

//Função que verifica se o apertamendo selecionado está sem morador cadastrado
export async function verifyMorador(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await vefifyMoradorAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, errors, data} = json

        //Retornando a menssagem
        return {message: message, data: data}
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao buscar o porteiro na API:", erro)

    }

}

//Função que salva o morador no banco de dados
export async function insertMorador(nome, cpf, email, telefone, senha, id_unidade) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await insertMoradorAPI(nome, cpf, email, telefone, senha, id_unidade)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, errors, data} = json

        //Retornando a menssagem
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cadastar o morador na API:", erro)

    }

}

//Função que recupera do banco de dados apenas um morador
export async function showMorador(id) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await showMoradorAPI(id)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, data} = json

        //Retornando a menssagem
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cadastar o morador na API:", erro)

    }

}

//Função que atualiza o morador no banco de dados
export async function updateMorador(id, nome, cpf, email, telefone, senha, id_unidade) {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await updateMoradorAPI(id, nome, cpf, email, telefone, senha, id_unidade)

        //Convertendo o JSON para objetos no JS
        let json = await response.json()

        //Desestrutura o promisse
        const { message, status, errors, data} = json

        //Retornando a menssagem
        return message
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco
    catch(erro){

        //Exibe um alerta na tela
        console.error("Erro ao cadastar o morador na API:", erro)

    }

}
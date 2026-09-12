import { deleteAreaComunAPI, getAreasComunsAPI, insertAreaComunAPI, showAreaComunAPI, updateAreaComunAPI } from "../api/AreaComumApi"

//Função que obtem todas as áreas comuns[cite: 2]
export async function obtendoAreasComuns() {
    
    //Tendanto executar a requisição[cite: 2]
    try{
        //Chamando a função que realiza a requisição no API[cite: 2]
        let response = await getAreasComunsAPI()

        //Convertendo o JSON para objetos no JS[cite: 2]
        let json = await response.json()

        //Desestrutura o promisse[cite: 2]
        const { message, status, data} = json

        //Verifica se houve algum erro na requisição[cite: 2]
        if(status != 200){
            //Para a execução do try e lança um erro para o catch[cite: 2]
            throw("Erro na requisição " + status)
        }

        //Retornando a menssagem[cite: 2]
        return data
    }
    //Casso aconteça algum erro na requisição, cai nesse bloco[cite: 2]
    catch(erro){
        //Exibe um alerta na tela[cite: 2]
        console.error("Erro ao buscar a área comum na API:", erro)
    }
}

//Função que deleta as áreas comuns[cite: 2]
export async function deleteAreaComun(id) {
    
    try{
        let response = await deleteAreaComunAPI(id)
        let json = await response.json()
        const { message, status, data} = json

        if(status != 200){
            throw("Erro na requisição " + status)
        }

        return message
    }
    catch(erro){
        console.error("Erro ao deletar a área comum na API:", erro)
    }
}

//Função que cria as áreas comuns[cite: 2]
export async function insertAreaComun(nome, descricao, autorizacao) {
    
    try{
        let response = await insertAreaComunAPI(nome, descricao, autorizacao)
        let json = await response.json()
        const { message, status, data} = json

        // No Insomnia o POST retorna 201 Created. Adicionando flexibilidade para 200 ou 201.
        if(status != 200 && status != 201){
            throw("Erro na requisição " + status)
        }

        return message
    }
    catch(erro){
        console.error("Erro ao inserir a área comum na API:", erro)
    }
}

//Função que recupera apenas uma área comum[cite: 2]
export async function showAreaComun(id) {
    
    try{
        let response = await showAreaComunAPI(id)
        let json = await response.json()
        const { message, status, data} = json

        if(status != 200){
            throw("Erro na requisição " + status)
        }

        return data
    }
    catch(erro){
        console.error("Erro ao buscar a área comum na API:", erro)
    }
}

//Função que atualiza a área comum
export async function updateAreaComun(id, nome, descricao, autorizacao) {
    
    try{
        // ATENÇÃO: A ordem aqui deve corresponder à ordem definida no arquivo AreaComumApi.js (nome, descricao, autorizacao, id)
        let response = await updateAreaComunAPI(nome, descricao, autorizacao, id)
        let json = await response.json()
        const { message, status, data} = json

        if(status != 200){
            throw("Erro na requisição " + status)
        }

        return message
    }
    catch(erro){
        console.error("Erro ao atualizar a área comum na API:", erro)
    }
}
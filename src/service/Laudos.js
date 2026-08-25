//Arquivo responsavel por fazer a requisição e tratar os dados

import { getLaudosAPI } from "../api/LaudosAPI"


//Função que obtem todas as regras
export async function obtendoLaudo() {
    
    //Tendanto executar a requisição
    try{

        //Chamando a função que realiza a requisição no API
        let response = await getLaudosAPI()

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

// //Função que deleta as regras
// export async function deleteRegras(id) {
    
//     //Tendanto executar a requisição
//     try{

//         //Chamando a função que realiza a requisição no API
//         let response = await deleteRegraAPI(id)

//         //Convertendo o JSON para objetos no JS
//         let json = await response.json()

//         //Desestrutura o promisse
//         const { message, status, data} = json

//         //Verifica se houve algum erro na requisição
//         if(status != 200){

//             //Para a execução do try e lança um erro para o catch
//             throw("Erro na requisição " + status)
//         }

//         //Retornando a menssagem
//         return message
//     }
//     //Casso aconteça algum erro na requisição, cai nesse bloco
//     catch(erro){

//         //Exibe um alerta na tela
//         console.error("Erro ao buscar o porteiro na API:", erro)

//     }

// }

// //Função que que cria as regras
// export async function insertRegras() {
    
//     //Tendanto executar a requisição
//     try{

//         //Chamando a função que realiza a requisição no API
//         let response = await insertRegraAPI()

//         //Convertendo o JSON para objetos no JS
//         let json = await response.json()

//         //Desestrutura o promisse
//         const { message, status, data} = json

//         //Verifica se houve algum erro na requisição
//         if(status != 200){

//             //Para a execução do try e lança um erro para o catch
//             throw("Erro na requisição " + status)
//         }

//         //Retornando a menssagem
//         return message
//     }
//     //Casso aconteça algum erro na requisição, cai nesse bloco
//     catch(erro){

//         //Exibe um alerta na tela
//         console.error("Erro ao buscar o porteiro na API:", erro)

//     }

// }

// //Função que que recupera apenas uma regra
// export async function showRegra(id) {
    
//     //Tendanto executar a requisição
//     try{

//         //Chamando a função que realiza a requisição no API
//         let response = await showRegraAPI(id)

//         //Convertendo o JSON para objetos no JS
//         let json = await response.json()

//         //Desestrutura o promisse
//         const { message, status, data} = json

//         //Verifica se houve algum erro na requisição
//         if(status != 200){

//             //Para a execução do try e lança um erro para o catch
//             throw("Erro na requisição " + status)
//         }

//         //Retornando a menssagem
//         return data
//     }
//     //Casso aconteça algum erro na requisição, cai nesse bloco
//     catch(erro){

//         //Exibe um alerta na tela
//         console.error("Erro ao buscar o porteiro na API:", erro)

//     }

// }

// //Função que atualiza a regra
// export async function updateRegra(id, nome, descricao) {
    
//     //Tendanto executar a requisição
//     try{

//         //Chamando a função que realiza a requisição no API
//         let response = await updateRegraAPI(nome, descricao, id)

//         //Convertendo o JSON para objetos no JS
//         let json = await response.json()

//         //Desestrutura o promisse
//         const { message, status, data} = json

//         //Verifica se houve algum erro na requisição
//         if(status != 200){

//             //Para a execução do try e lança um erro para o catch
//             throw("Erro na requisição " + status)
//         }

//         //Retornando a menssagem
//         return message
//     }
//     //Casso aconteça algum erro na requisição, cai nesse bloco
//     catch(erro){

//         //Exibe um alerta na tela
//         console.error("Erro ao buscar o porteiro na API:", erro)

//     }

// }
//Arquivo responsavel por intermediar a lógica entre a tela que de controle de usuários pelo sindico e a API

import { getMoradores } from "../api/MoradoresApi"
import { getPorteiro } from "../api/PorteiroApi"


//Função responsavel por realizar o login
export async function LoagindUsers(tipoUser){

    //Tendanto executar a requisição
    try{

        //Variável que irá armazenar o usuários recuperados
        let users = []

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

        //Desestrutura o promisse
        const { message, status, data} = users

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
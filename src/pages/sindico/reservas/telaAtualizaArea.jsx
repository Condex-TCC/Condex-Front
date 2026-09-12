import React, { useEffect, useState } from 'react';
import styles from '../../../css/paginaCadastraRegra.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { showAreaComun, updateAreaComun } from '../../../service/AreaComum';

export default function PaginaAtualizaArea() {

  //Hook que realiza a navegação
  const navigate = useNavigate()

  //Hook que permite recuperar o parametro da url
  const { id } = useParams()

  //States para controlar o valor dos campos
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [autorizacao, setAutorizacao] = useState(false)

  //Função que pega o valor e altera o estado
  const nomeState = (evento) => {
    setNome(evento.target.value)
  }

  //Função que pega o valor e altera o estado
  const descricaoState = (evento) => {
    setDescricao(evento.target.value)
  }

  //Função responsavel por voltar para a tela que exibe os laudos
  const back = () => {
    navigate("/sindico/reservas/gerenciamento")
  }

  //Função que carrega os dados da API
  const obtendoApertamento = async () => {
    try {
      let dados = await showAreaComun(id)
      
      if (dados) {
        setNome(dados.nome || "")
        setDescricao(dados.descricao || "")
        
        // Converte explicitamente para booleano (aceita true, false, 1, 0, "1", "0", "true", "false")
        const valorAutorizacao = 
          dados.autorizacao === true || 
          dados.autorizacao === 1 || 
          dados.autorizacao === '1' || 
          String(dados.autorizacao).toLowerCase() === 'true';

        setAutorizacao(valorAutorizacao)
      }
    } catch (error) {
      console.error("Erro ao carregar dados da área comum:", error)
    }
  }

  //Sempre que a página for carregar irá adicionar os dados nos campos
  useEffect(() => {
    if (id) {
      obtendoApertamento()
    }
  }, [id]);

  //Função que realiza o update da regra
  const atualizaArea = async () => {
    try {
      // Envia os dados (garantindo que autorizacao seja estritamente booleano true/false)
      let message = await updateAreaComun(id, nome, descricao, Boolean(autorizacao))
    
      navigate('/sindico/mensagem', {
        state: {
          menssagem: message || "Área atualizada com sucesso!",
          redirecionamento: '/sindico/reservas/gerenciamento'
        }
      });
    } catch (error) {
      console.error("Erro ao atualizar:", error)
    }
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1 className={styles.title}>Atualizar Área Comum</h1>

        <button className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>

      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); atualizaArea(); }}>
        <input 
          type="text" 
          placeholder="Nome do local.." 
          className={styles.inputTitle}
          value={nome}
          onChange={nomeState} 
        />
        
        <textarea 
          placeholder="Descrição do local..." 
          className={styles.inputDescription}
          value={descricao}
          onChange={descricaoState}
        />

        {/* Início dos Radio Buttons */}
        <div className={styles.radioGroup}>
          <span className={styles.radioTitle}>Requer autorização?</span>
          
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="autorizacao"
              className={styles.radioInput}
              checked={autorizacao === true}
              onChange={() => setAutorizacao(true)}
            />
            Sim
          </label>
          
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="autorizacao"
              className={styles.radioInput}
              checked={autorizacao === false}
              onChange={() => setAutorizacao(false)}
            />
            Não
          </label>
        </div>
        {/* Fim dos Radio Buttons */}
        
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}
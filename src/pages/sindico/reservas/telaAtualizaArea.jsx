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

      {/* Cabeçalho da página: contexto (Áreas comuns), ação e apoio */}
      <header className={styles['cabecalho-pagina']}>
        <div>
          <p className="cx-overline">Áreas comuns</p>
          <h2 className="cx-page-title">Atualizar Área Comum</h2>
          <p className="cx-page-subtitle">
            Revise o cadastro do local e a regra de autorização.
          </p>
        </div>

        <button type="button" className={styles.backButton} onClick={back}>
          &larr; Voltar
        </button>
      </header>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); atualizaArea(); }}>

        <section className={styles['form-secao']} aria-labelledby="secao-area">
          <h3 className={styles['form-secao__titulo']} id="secao-area">
            Dados da área
          </h3>

          <div className={styles['form-grid']}>
            <div className={styles.campo}>
              <label className={styles['campo__label']} htmlFor="area-nome">Nome do local</label>
              <input
                id="area-nome"
                type="text"
                placeholder="Nome do local.."
                className={styles.inputTitle}
                value={nome}
                onChange={nomeState}
              />
            </div>

            {/* Campo longo: ocupa a linha inteira da grade */}
            <div className={`${styles.campo} ${styles['campo--full']}`}>
              <label className={styles['campo__label']} htmlFor="area-descricao">Descrição do local</label>
              <textarea
                id="area-descricao"
                placeholder="Descrição do local..."
                className={styles.inputDescription}
                value={descricao}
                onChange={descricaoState}
              />
            </div>
          </div>

          {/* Início dos Radio Buttons */}
          <div className={styles.radioGroup} role="group" aria-labelledby="rotulo-autorizacao">
            <span className={styles.radioTitle} id="rotulo-autorizacao">Requer autorização?</span>

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
        </section>

        {/* Rodapé de ações: única primária da tela, à direita */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}
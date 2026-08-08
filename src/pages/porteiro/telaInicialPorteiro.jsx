//Local das importações
import styles from "../../css/paginainicialPorteiro.module.css"

//Página inicial do porteiro

//Função que cria o componente do porteiro
function PaginainicialPorteiro(){
    
    //Retorna um componente
    //Retorna um componente
    return (
    <div className={styles['dashboard--container']}>
      
      <div className={styles['header--section']}>
        <div className={styles['tabs--group']}>
          <button className={styles['tab--active']}>Visitantes</button>
          <button className={styles['tab--inactive']}>Encomendas</button>
        </div>
        <button className={styles['btn--add']}>+ Registrar visitante</button>
      </div>

      <div className={styles['list--section']}>
        <h2 className={styles['section--title']}>Pre cadastrados</h2>
        
        <h1>Não visitantes cadastrados</h1>
      </div>

      <div className={styles['list--section']}>
        <h2 className={styles['section--title']}>Visitantes ativos</h2>
        
        <h1>Não ha visitantes ativos</h1>
      </div>
      

    </div>
  )
}

//Exportando o compomente para ser utilizado em outra página
export default PaginainicialPorteiro
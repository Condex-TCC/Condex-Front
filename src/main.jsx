import { StrictMode } from 'react' //Ferreamento do react que ajuda a encontrar erros
import { createRoot } from 'react-dom/client' //Cria a principal div do projeto

//Importando o elemento que analizar a URL e criar os componentes apartir daí 
import { RouterProvider } from 'react-router-dom'

//Importando o arquivo de rotas
import  route  from './routes/router'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* Componente que aplcia a criação dos componemtes apartir da URL */}
    <RouterProvider router={route} />
  </StrictMode>,
)

<h1 align='center' id='Título-e-Imagem-de-capa'> TrybeTunes</h1>

<p align='center'>
<img src='./src/style/images/TrybeTunes.png'></img>
</p>


## Bradges

<p align='left'>
<img src='https://img.shields.io/badge/STATUS-FINALIZADO-Green' width='250px'></img>
</p>

## Descrição do projeto

### Projeto realizado mediante a necessidade da prática em conceitos inicialmente abordados de forma teórica.
### Neste projeto em específico, pratiquei ainda mais a forma de se desenvolver uma aplicação em React. Usando componentes de classes, e junto com eles, tambem usei os conhecimentos de ciclos de vida de um componente.
### Além disso, pratiquei requisições para API's, junto com isso, veio a necessidade de tratar essas requisições como uma Promise e então encaminhar os resultados para a tela do usuário.
### API('s) usada(s): 

### :heavy_check_mark: - End-Point para albuns: https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm;
### :heavy_check_mark: - End-Point para músicas: https://itunes.apple.com/lookup?id=${id}&entity=song.


## :hammer: Funcionalidades :hammer:

### A aplicação se inicia com uma tela de loading, logo em seguida tem-se uma tela de Login.
### Quando logado, a págia é redirecionada para a pagina inicial do site pós login. Lá o usuário tem acesso a 3 menus na barra de navegação, são eles: Pesquisar, Favoritos e Perfil respectivamente.
### A página e pesquisa tem como objetivo pegar o texto colocado pelo usuário no input e trazer os resultados referente a pesquisa. Todos os resultados são em forma de álbuns ou em forma de musica single (que também se comporta visualmente como um álbum).
### Quando clicado em algum álbum, o usuário é redirecionado para o album da mesma, onde pode favoritas a(s) musica(s).
### A página de favoritos tem todas as musicas que o usuário favoritas.
### A página de profile tem todos os dados do usuário, tendo como função um botão de alterar dados, que quando clicado, é redirecionado para uma págia de editar dados. Além deste botão, a mesma tem uma função de logout, onde quando clicado, é redirecionado para a página de login (caso o usuário não faça logout, todos os acessos á página entraram diretamente na página de pesquisa, fazendo-se um login automático).

## :computer: Tecnologias/Linguagens utilizadas :computer:

### Tecnologias: - HTML5, CSS6 e JS6 - :heavy_check_mark:
### Bibliotecas: - React, react-router-dom@v5, bootstrap@v5, reactstrap@v9 e prop-types@15 - :heavy_check_mark:

## Pessoas Desenvolvedoras do Projeto.
### Projeto realizado em conjunto com a empresa de tecnologia Trybe, que foi a responsável pela criação dos testes com o RTL (react test library), fazendo-se assim, toda a estrutura necessária para um bom desenvolvimento orientado a testes (TDD).
### Além dos testes, todos os arquivos criados no diretorio src/services são de autória da Trybe, assim como todos os scripts do package.json, com excessão do "error': 'npm run lint -- --fix" (linha 27).
### Todos os demais arquivos e diretórios do projeto são de autoria minha, isso inclui: src/components, src/pages, src/style. Os demais arquivos soltos na pasta src/ também são de minha autoria, isso inclui: App.jsx, index.js.
#### OBS 1: O arquivo setupTests.js já vem como default com o React na instalação feita (npx create-react-app .).
#### OBS 2: Todos os testes de com o RTL foram devidamente apagados, esta ação envolve proteger a autoria de código, respeitando assim as normas e regras internas da empresa de tecnologia Trybe.

<h1>Avaliação Trainee Viuzz</h1>

Este projeto é um website utilizando React, criado como parte de uma avaliação. A ideia é ser um website com 3 telas (login, cadstro e funcionários), onde o usuário deverá ser capaz de fazer login, cadastrar novo funcionário e verificar a lista dos funcionários (podendo excluir ou alterar os funcionários cadastrados).<br><br>

Dentre os requisitos solicitados para avaliação, estão:<br>
- Apenas usuários autenticados deverão ter acesso as telas de cadastro e funcionários.<br>
- O formulário de login deverá contar com os seguintes campos: email, senha.<br>
- O formulário de cadastro de funcionário deverá conter os seguintes campos: nome, cidade, cargo.<br>
- Na tela de cadastro deverá feita requisição para o link<br>
https://servicodados.ibge.gov.br/api/v1/localidades/distritos, e utilizado o resultado para preencher o campo select “cidade” do funcionário a ser cadastrado.<br>
- Os dados da aplicação precisam ser salvos de forma persistente no localstorage.<br><br>

Diferenciais avaliativos:<br>
- A reutilização de componentes.<br>
- MaterialUI e styled-components.<br>
- TypeScript.<br><br>

<h2>Requisitos para rodar o projeto</h2>

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los em [nodejs.org](https://nodejs.org/).<br><br>

<h2>Instalação</h2>

Para instalar as dependências necessárias, execute os seguintes comandos no diretório do projeto:<br><br>

1. Faça o clone deste repositório em sua máquina:<br>
   Abra o Git Bash na pasta onde deseja instalar o projeto e utilize o comando abaixo.<br>
   git clone https://github.com/fernando-io/avaliacaotrainee-viuzz.git<br><br>

2. Abra a pasta do projeto (\avaliacaotrainee-viuzz) no VSCode e abra o terminal.<br><br>

3. No terminal, instale as dependências do projeto com o comando:<br>
   npm install<br><br>

4. Ainda no terminal, inicialize o projeto utilizando o comando:<br>
   npm start<br>
   Aguarde e abra o link local fornecido no terminal. Você será redirecionado para o website do projeto, no seu navegador.<br><br>

<h2>Dependências</h2>

As dependências do projeto são:<br><br>

- **@emotion/react**: Biblioteca para CSS-in-JS.<br>
- **@emotion/styled**: Estilização de componentes usando Emotion.<br>
- **@mui/material**: Componentes de UI Material-UI.<br>
- **@mui/x-data-grid**: Componente para tabelas e grids altamente personalizáveis no Material-UI.<br>
- **react**: Biblioteca principal para construir interfaces.<br>
- **react-dom**: Biblioteca para interagir com o DOM.<br>
- **react-router-dom**: Biblioteca para roteamento em aplicativos React.<br>
- **typescript**: Suporte para TypeScript.<br>
- **web-vitals**: Ferramenta para medir a performance da aplicação.<br>

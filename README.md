# Avaliação Trainee Viuzz

Este projeto é um website utilizando React, criado como parte de uma avaliação. A ideia é ser um website com 3 telas (login, cadstro e funcionários), onde o usuário deverá ser capaz de fazer login, cadastrar novo funcionário e verificar a lista dos funcionários (podendo excluir ou alterar os funcionários cadastrados).

Dentre os requisitos solicitados para avaliação, estão:
- Apenas usuários autenticados deverão ter acesso as telas de cadastro e funcionários.
- O formulário de login deverá contar com os seguintes campos: email, senha.
- O formulário de cadastro de funcionário deverá conter os seguintes campos: nome, cidade, cargo.
- Na tela de cadastro deverá feita requisição para o link
https://servicodados.ibge.gov.br/api/v1/localidades/distritos, e utilizado o resultado para preencher o campo select “cidade” do funcionário a ser cadastrado.
- Os dados da aplicação precisam ser salvos de forma persistente no localstorage.

Diferenciais avaliativos:
- A reutilização de componentes.
- MaterialUI e styled-components.
- TypeScript.

## Requisitos para rodar o projeto

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

## Instalação

Para instalar as dependências necessárias, execute os seguintes comandos no diretório do projeto:

1. Faça o clone deste repositório em sua máquina:
   Abra o Git Bash na pasta onde deseja instalar o projeto e utilize o comando abaixo.
   
   git clone https://github.com/fernando-io/avaliacao-viuzz.git

2. Abra a pasta do projeto (\avaliacao-viuzz) no VSCode e abra o terminal.

3. No terminal, instale as dependências do projeto com o comando:

   npm install

4. Ainda no terminal, inicialize o projeto utilizando o comando:
   
   npm start

   Aguarde e abra o link local fornecido no terminal. Você será redirecionado para o website do projeto, no seu navegador.

## Dependências

As dependências do projeto são:

- **@emotion/react**: Biblioteca para CSS-in-JS.
- **@emotion/styled**: Estilização de componentes usando Emotion.
- **@mui/material**: Componentes de UI Material-UI.
- **@mui/styled-engine-sc**: Estilização de componentes usando Styled Components com Material-UI.
- **react**: Biblioteca principal para construir interfaces.
- **react-dom**: Biblioteca para interagir com o DOM.
- **react-router-dom**: Biblioteca para roteamento em aplicativos React.
- **styled-components**: Estilização de componentes usando Styled Components.
- **typescript**: Suporte para TypeScript.
- **web-vitals**: Ferramenta para medir a performance da aplicação.

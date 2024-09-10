# Gerenciador de Projetos

## Descrição

O **Gerenciador de Projetos** é uma aplicação web que permite ao usuário visualizar, adicionar, editar, remover e favoritar projetos. A aplicação é composta por uma API utilizando JSON Server para o backend e uma interface de frontend interativa.

## Instalação

Para configurar o projeto, siga estes passos:

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/ssp1999/project-manager
    ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd project-manager
    ```

3. **Crie o arquivo `.env` a partir do exemplo:**

    ```bash
    .env.example
    ```

4. **Configure o arquivo `.env` conforme necessário.**

5. **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

6. **Construa o projeto para produção:**

    ```bash
    npm run build
    ```

7. **Inicie o servidor JSON Server:**

    ```bash
    json-server --watch db.json --port 3001
    ```

8. **Execute o projeto em modo de preview:**

    ```bash
    npm run preview
    ```

## Executando o Projeto

Após a configuração, você pode acessar a aplicação no navegador através do endereço:

[http://localhost:3000](http://localhost:3000)

## Observação

Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env` para que a API funcione conforme esperado.

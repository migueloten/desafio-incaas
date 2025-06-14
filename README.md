# DesafioIncaas

Este projeto foi desenvolvido como parte de um desafio técnico da empresa Incaas. Ele utiliza o [Angular CLI](https://github.com/angular/angular-cli) versão 20.0.2 para a construção de uma aplicação web moderna.

## Resumo

O objetivo deste projeto é demonstrar habilidades em desenvolvimento frontend utilizando Angular, seguindo as melhores práticas de arquitetura, componentização e organização de código.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/migueloten/desafio-incaas.git
   cd desafio-incaas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Servidor de desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:

```bash
ng serve
```

Depois que o servidor estiver rodando, abra o navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar os arquivos fonte.

## Gerando componentes

Para gerar um novo componente, utilize:

```bash
ng generate component nome-do-componente
```

Para ver a lista completa de esquemas disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Build

Para compilar o projeto, execute:

```bash
ng build
```

Os artefatos de build serão armazenados no diretório `dist/`. O build de produção otimiza a aplicação para melhor desempenho.

## Executando testes unitários

Para rodar os testes unitários com o [Karma](https://karma-runner.github.io):

```bash
ng test
```

## Executando testes end-to-end

Para rodar os testes end-to-end (e2e):

```bash
ng e2e
```

O Angular CLI não inclui um framework de e2e por padrão. Escolha o que melhor se adequar à sua necessidade.

## Recursos adicionais

Para mais informações sobre o Angular CLI, consulte

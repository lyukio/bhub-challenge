# BHub-Challenge

Desafio BHub é um projeto criado com o intuito de mostrar um pouco das minhas habilidades para a BHub

### 📂 Documentação

Diagramas: https://miro.com/app/board/uXjVMkmuoBI=/?share_link_id=83813679766

Endpoints: https://documenter.getpostman.com/view/3683235/2s9YCARW1u

### 📝 Planejamento

Neste item falarei um pouco do que pensei antes (e um pouco do durante) o desenvolvimento da solução.
É aconselhável dar uma olhada por cima no diagrama no item "Documentação" acima antes de continuar.

Primeiramente, li o PDF do desafio enquanto fui anotando pontos importantes em um documento no Notion.
Durante o planejamento vi que o contexto era amplo e que as responsabilidades poderiam ser divididas entre vários projetos. Esse é o motivo do primeiro desenho que fiz dando nome e responsabilidades para cada projeto.
Agora partindo do ponto que eu tinha tomado nota dos projeto e suas (possíveis) comunicações, comecei a criar um diagrama com as entidades ainda mantendo o agrupamento por projeto. Assim conseguindo ter um visão de quais seriam as limitações em que eu desenvolveria esse projeto, ou seja, até onde iria codificar a solução.

### 🎯 Solução




### 📋 Pré-requisitos

```
Node v16.20.1
```

### 🔧 Instalação

Estando dentro da pasta functions:
```
cd functions
```

Execute o seguinte comando:

```
npm i
```

### ⚙️ Executando os testes

Dentro da pasta functions:

```
npm run test
```

### ⌨️ Execução

Para rodar localmente primeiro é necessário estar na pasta functions
```
cd functions
```

Depois é necessário dar build no TS com o comando:

```
tsc
```

Ou se quiser ficar observando alterações pode usar o

```
tsc -w
```
Após isso, volte para a pasta raiz:
```
cd ..
```
E execute o seguinte comando:
```
firebase emulators:start
```

Se alguma porta estiver sendo usada, você pode alterar para usar outras no arquivo `firebase.json`

Dica: você pode deixar o comando `tsc -w` em um terminal (na pasta `functions`) enquanto roda `firebase emulators:start` em outro (na pasta raiz do projeto)

## 🛠️ Construído com

* [Express](https://www.npmjs.com/package/express) - O framework utilizado para criar a API
* [Firebase Functions](https://firebase.google.com/docs/functions) - Framework serverless
* [Firestore](https://firebase.google.com/docs/firestore) - Usado como BD

---
⌨️ com ❤️ por [Lyukio](https://github.com/lyukio) 😊

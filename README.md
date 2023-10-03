# BHub-Challenge

Desafio BHub é um projeto criado com o intuito de mostrar um pouco das minhas habilidades para a BHub

### 📂 Documentação

Diagramas: https://miro.com/app/board/uXjVMkmuoBI=/?share_link_id=83813679766

Nos diagramas acima contém um pouco do que pensei em questão de soluções, incluindo essa feita, obviamente.

Endpoints: https://documenter.getpostman.com/view/3683235/2s9YCARW1u

### 📝 Planejamento

Neste item falarei um pouco do que pensei antes (e um pouco durante) o desenvolvimento da solução.
É aconselhável dar uma olhada por cima no diagrama no item "Documentação" acima antes de continuar.

Primeiramente, li o PDF do desafio enquanto fui anotando pontos importantes em um documento no Notion.
Durante o planejamento vi que o contexto era amplo e que as responsabilidades poderiam ser divididas entre vários projetos. Esse é o motivo do primeiro desenho que fiz dando nome e responsabilidades para cada projeto.
Agora partindo do ponto que eu tinha tomado nota dos projeto e suas (possíveis) comunicações, comecei a criar um diagrama com as entidades ainda mantendo o agrupamento por projeto. Assim conseguindo ter um visão de quais seriam as limitações em que eu desenvolveria esse projeto, ou seja, até onde iria codificar a solução.

### 🎯 Solução

Após o planejamento, decidi que iria fazer a solução desde ter a classe `User` até as classes suficientes relacionadas a pedidos/pagamentos para simular a ativação de ações variáveis/customizáveis dependendo do que se tratar o pagamento, referente as regras citadas no PDF do desafio.

Explicando a solução separadas pelas entidades:
User: responsável pelos registros de usuários. Em um nível maior de solução pode ser adicionado uma propriedade para controlar o nível de associado.
Product: representação do produto disponível, e sem "ligação" com pedidos ainda.
Item: diferente do `Product`, este seria uma representação do produto no momento do pedido. Logo se o produto for alterado (preço, por exemplo) após isso, o `Item` se mantém como foi pedido naquele momento.
Order: responsável pelos pedidos, status de pagamentos e quais itens estão no pedido.
Category: representa as categorias de produtos/itens.
Action: ações que podem ser ativadas dependendo de alguma relação/regra.
CorrelationAction: responsável por correlacionar as ações que devem ser ativadas. Por exemplo: quando um produto X ser pedido ou quando um produto da categoria Y ser pedido.

Pensando numa solução incluindo front-end, imagino uma área para admin para gerenciar as `Action` e as `CorrelationAction`.

É importante dizer também que o momento da ativação de uma `Action` é verificada na criação de um `Order`, ou seja, quando um novo pedido for feito é verificado todas as "regras" utilizando itens, categorias e o `CorrelationAction`. O teste realizado em jest exemplifica um caso desse para ficar mais claro.

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

# BHub-Challenge

Desafio BHub

### 📋 Pré-requisitos

```
Node v16.20.1
```

### 🔧 Instalação

Estando dentro da pasta functions:
```
cd functions
```.

Execute o seguinte comando:

```
npm i
```

## ⚙️ Executando os testes

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
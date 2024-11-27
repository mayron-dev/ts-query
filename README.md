## **README**

# **@mayron-dev/ts-query**

Uma biblioteca em TypeScript para a construção fluente de consultas HTTP. Simplifica a criação de requisições e manipulação de filtros como ordenação, paginação e validação de respostas, utilizando uma abordagem flexível e extensível.

---

## **Instalação**

Instale a biblioteca diretamente do **npm**:

```bash
npm install @mayron-dev/ts-query
```

---

## **Principais Funcionalidades**

- **Construção fluente**: Encadeie métodos para configurar filtros, caminhos e validações.
- **Suporte a filtros**: Configure ordenação (`order`), paginação (`limit` e `offset`) e outros parâmetros.
- **Métodos HTTP**: Suporte a métodos como `GET`, `POST`, `PUT` e `DELETE`.
- **Extensibilidade**: Adicione novas funcionalidades sem quebrar o padrão existente.

---

## **Uso**

### **Exemplo Básico**

```typescript
import { GetQuery } from "@mayron-dev/ts-query";

const query = new GetQuery()
  .path("/api/v1/users") // Define o caminho
  .validateResponse(false) // Desativa a validação da resposta
  .filter() // Inicia a configuração do filtro
  .order({ field: "name", type: "asc" }) // Adiciona ordenação
  .limit(10) // Limita os resultados
  .offset(0); // Define o início da paginação

query.build();
// Saída esperada:
// {
//   method: "GET",
//   path: "/api/v1/users",
//   validateResponse: false,
//   filter: { order: [{ field: "name", type: "asc" }], limit: 10, offset: 0 }
// }
```

---

## **API**

### **Query (Classe Base)**

| Método               | Descrição                                                                                   |
|----------------------|---------------------------------------------------------------------------------------------|
| `path(path: string)` | Define o caminho da requisição.                                                             |
| `validateResponse(v: boolean)` | Ativa/desativa validação automática da resposta.                                         |
| `filter()`           | Cria e retorna um `FilterBuilder` para configuração de filtros.                              |

### **FilterBuilder**

| Método                     | Descrição                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------|
| `order(order: Order)`      | Define a ordenação, aceitando um ou mais campos (`field` e `type`: `asc` ou `desc`).    |
| `limit(v: number)`         | Define o número máximo de itens retornados.                                             |
| `offset(v: number)`        | Define o deslocamento inicial para paginação.                                           |
| `build()`                  | Gera e retorna o objeto com os filtros configurados.                                    |

### **GetQuery**

Classe derivada de `Query`, configurada para requisições `GET`. Possui os mesmos métodos de `Query`, com suporte adicional para filtros.

---

## **Scripts**

- `npm start`: Executa o código principal para testes locais.
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm test`: Roda os testes configurados com **Jest**.
- `npm run lint`: Analisa o código com **ESLint** para garantir padrões de qualidade.
- `npm publish`: Publica o pacote no **npm**, após compilar os arquivos.

---

## **Contribuindo**

1. Faça um fork do repositório.
2. Crie uma nova branch para sua feature: `git checkout -b minha-feature`.
3. Faça suas alterações e commit: `git commit -m "Adicionei nova feature"`.
4. Envie sua branch: `git push origin minha-feature`.
5. Abra um **pull request** no repositório principal.

---

## **Licença**

Este projeto está licenciado sob a **ISC License**. Consulte o arquivo `LICENSE` para mais detalhes.
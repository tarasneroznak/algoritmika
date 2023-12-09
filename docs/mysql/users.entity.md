# users

> Update tags here `infra` `marketing`

| Name     | Type     | PK  | FK  | Nullable | Default |
| -------- | -------- | --- | --- | -------- | ------- |
| id       | varchar  | [x] |     | FALSE    | null    |
| core_id  | varchar  |     | [x] | FALSE    | null    |
| core_id  | has_one  |     | [x] | FALSE    | null    |
| features | has_many |     | [x] | FALSE    | null    |
|          | has_many |     | [x] | FALSE    | null    |

### Diagram

```mermaid
erDiagram
users {
varchar id PK "(not null,default 'null')"
varchar core_id "(not null,default 'null')"
has_one core_id "(not null,default 'null')"
has_many features "(not null,default 'null')"

}
```

### Note

> Add something

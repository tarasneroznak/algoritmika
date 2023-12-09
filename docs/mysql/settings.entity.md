# settings

`infra` `marketing`

| Name    | Type                      | PK  | FK  | Nullable | Default |
| ------- | ------------------------- | --- | --- | -------- | ------- |
| id      | varchar                   | [x] |     | FALSE    | null    |
| user_id | varchar, belongs to users |     | [x] | FALSE    | null    |

### Diagram

```mermaid
erDiagram
settings {
varchar id PK "(not null,default 'null')"
varchar user_id "(not null,default 'null')"
}
```

### Note

> Add something

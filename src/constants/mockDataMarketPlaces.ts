import { createData } from "../pages/Marketplaces/components/MarketplacesTable";

export const rows = [
  createData(
    1,
    "Minha loja",
    "Shopee",
    3.7,
    10,
    2,
    30,
    "2023-01-01",
    "2023-01-02"
  ),
  createData(
    2,
    "Outra loja",
    "Mercado Livre",
    25.0,
    15,
    3,
    45,
    "2023-01-01",
    "2023-01-02"
  ),
  createData(
    3,
    "Loja Teste",
    "Magazine Luiza",
    16.0,
    12,
    4,
    60,
    "2023-02-01",
    "2023-02-05"
  ),
  createData(
    4,
    "Loja Exemplo",
    "Amazon",
    6.0,
    8,
    1,
    15,
    "2023-03-01",
    "2023-03-03"
  ),
  createData(
    5,
    "Loja Genérica",
    "Aliexpress",
    16.0,
    20,
    5,
    30,
    "2023-04-01",
    "2023-04-07"
  ),
  createData(
    6,
    "Loja Moda",
    "Shein",
    3.2,
    10,
    2,
    20,
    "2023-05-01",
    "2023-05-10"
  ),
  createData(
    7,
    "Loja Mercado",
    "TaQi",
    9.0,
    12,
    3,
    40,
    "2023-06-01",
    "2023-06-15"
  ),
  createData(
    8,
    "Loja Online",
    "Shoptime",
    0.0,
    5,
    0,
    10,
    "2023-07-01",
    "2023-07-02"
  ),
  createData(
    9,
    "Comércio Digital",
    "Submarino",
    26.0,
    18,
    4,
    25,
    "2023-08-01",
    "2023-08-05"
  ),
  createData(
    10,
    "Loja Virtual",
    "Ponto",
    0.2,
    7,
    2,
    20,
    "2023-09-01",
    "2023-09-05"
  ),
  createData(
    11,
    "E-commerce Exemplo",
    "Americanas",
    0.0,
    6,
    1,
    18,
    "2023-09-10",
    "2023-09-15"
  ),
  createData(
    12,
    "Loja Referência",
    "Havan",
    19.0,
    12,
    3,
    35,
    "2023-10-01",
    "2023-10-02"
  ),
  createData(
    13,
    "Comércio Teste",
    "Quero-quero",
    18.0,
    14,
    2,
    50,
    "2023-10-10",
    "2023-10-15"
  ),
].sort((a, b) => (a.id < b.id ? -1 : 1));

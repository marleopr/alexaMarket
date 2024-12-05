export type LoggedUser = {
  globalAccountKey?: string; // Tornando algumas propriedades opcionais
  productKey?: string;
  account?: string;
  userAccountID?: string;
  email?: string; // Propriedades adicionais que podem vir do back-end
  active?: boolean;
  name?: string;
  phone?: string;
  celPhone?: string;
  mainUser?: boolean;
  username?: string;
  role?: "admin" | "user"; // O tipo do role pode ser mais específico
};

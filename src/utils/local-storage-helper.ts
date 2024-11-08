const saveToken = "save-token";
const saveRefreshToken = "save-refresh";
const saveUserId = "save-user-id";

export const saveTokenInLocalStorage = (token: string) => {
  localStorage.setItem(saveToken, token);
};

export const saveRefreshTokenInLocalStorage = (refreshToken: string) => {
  localStorage.setItem(saveRefreshToken, refreshToken);
};

export const saveUserIdInLocalStorage = (userId: string) => {
  localStorage.setItem(saveUserId, userId);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(saveToken);
};

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem(saveRefreshToken);
};

export const getUserIdFromLocalStorage = () => {
  return localStorage.getItem(saveUserId);
};

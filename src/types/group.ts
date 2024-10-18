export type Group = {
  id: string;
  name: string;
  users: UserInsideGroup[];
};

export type UserInsideGroup = {
  id: string;
  username: string;
  name: string;
  email: string;
  status: string;
};

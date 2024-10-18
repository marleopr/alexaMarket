export type Action = {
  name: string;
  destinationStageIdentifier: number | null;
  permission: {
    usersIds: string[];
    groupsIds: string[];
  };
};

export type Stage = {
  identifier: number;
  name: string;
  type: string;
  color: string;
  actions: Action[];
};

export type ApprovalFlow = {
  id?: string;
  name: string;
  description: string;
  stages: Stage[];
  active?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserType = {
  id?: string;
  fullName?: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  refreshToken: string;
};

export type UserRegisterPayloadType = {
  fullName: string;
  email: string;
  password: string;
};

export type UserLogInPayloadType = {
  email: string;
  password: string;
};

export type DecodedRefreshToken = {
  email: string;
};

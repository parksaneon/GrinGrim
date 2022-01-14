let users = [
  {
    userId: 'bnb135',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: 'Park'
  }
];

export const findUserById = userId => users.find(user => user.userId === userId);

// export const setRefreshTokenById = (userId, refreshToken) => {
//   findUserById(userId).refreshToken = refreshToken;
// };

export const addNewUser = newUser => {
  users = [newUser, ...users];
};

export const getUsers = () => users;

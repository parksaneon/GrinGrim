let users = [
  {
    id: 1,
    userId: 'bnb135',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '박상언'
  },
  {
    id: 2,
    nickname: '최한나'
  }
];

export const getUsers = () => users;
export const findUserById = id => users.find(user => user.id === +id);
export const getNickname = id => findUserById(id).nickName;
export const addNewUser = newUser => {
  users = [newUser, ...users];
};

// export const setRefreshTokenById = (userId, refreshToken) => {
//   findUserById(userId).refreshToken = refreshToken;
// };

let users = [
  {
    id: 1,
    userId: 'bnb135',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '박상언'
  },
  {
    id: 2,
    nickName: '최한나'
  }
];

const findUserById = id => users.find(user => user.id === +id);

export const generateUserId = () => (users[users.length - 1]?.id || 0) + 1;
export const getUsers = () => users;
export const findUserByUserId = userId => users.find(user => user.userId === userId);
export const getNickname = id => findUserById(id).nickName;
export const addNewUser = newUser => {
  users = [newUser, ...users];
};

// export const setRefreshTokenById = (userId, refreshToken) => {
//   findUserById(userId).refreshToken = refreshToken;
// };

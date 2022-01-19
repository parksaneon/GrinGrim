let users = [
  {
    id: 1,
    userId: 'bnb135',
    profile: 'images/users/2.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '박상언'
  },
  {
    id: 2,
    profile: 'images/users/3.png',
    nickName: '최한나'
  }
];

const findUserById = id => users.find(user => user.id === +id);

export const getUsers = () => users;
export const findUserByUserId = userId => users.find(user => user.userId === userId);
export const getNickname = id => findUserById(id).nickName;
export const getProfile = id => findUserById(id).profile;
export const addNewUser = newUser => {
  users = [newUser, ...users];
};

// export const setRefreshTokenById = (userId, refreshToken) => {
//   findUserById(userId).refreshToken = refreshToken;
// };

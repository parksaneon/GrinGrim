let users = [
  {
    id: 1,
    userId: 'bnb135',
    profile: 'images/users/1.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '박상언'
  },
  {
    id: 2,
    userId: 'bnb136',
    profile: 'images/users/2.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '최한나'
  },
  {
    id: 3,
    userId: 'bnb137',
    profile: 'images/users/3.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '여은성'
  },
  {
    id: 4,
    userId: 'bnb138',
    profile: 'images/users/',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: ''
  }
];

const findUserById = id => users.find(user => user.id === +id);

export const generateUserId = () => (users[users.length - 1]?.id || 0) + 1;
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

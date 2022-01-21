let users = [
  {
    id: 1,
    userId: 'bnb135',
    profile: 'images/users/1.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '상언이'
  },
  {
    id: 2,
    userId: 'bnb136',
    profile: 'images/users/2.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '한나초이'
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
    profile: 'images/users/4.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '밍망디'
  },
  {
    id: 5,
    userId: 'bnb139',
    profile: 'images/users/5.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '루시안'
  },
  {
    id: 6,
    userId: 'bnb140',
    profile: 'images/users/6.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '조용필'
  },
  {
    id: 7,
    userId: 'bnb141',
    profile: 'images/users/7.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '천효'
  },
  {
    id: 8,
    userId: 'bnb142',
    profile: 'images/users/8.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '시골쥐'
  },
  {
    id: 9,
    userId: 'bnb143',
    profile: 'images/users/9.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '자두'
  },
  {
    id: 10,
    userId: 'bnb144',
    profile: 'images/users/3.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: 'ssong'
  },
  {
    id: 11,
    userId: 'bnb145',
    profile: 'images/users/11.jpg',
    password: '$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m',
    nickName: '민소프트'
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

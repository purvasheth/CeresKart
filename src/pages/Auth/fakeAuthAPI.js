import get from "lodash/get";

// Database
const Users = [
  {
    username: "test",
    password: "test@123",
  },
  {
    username: "admin",
    password: "admin@123",
  },
];

const findUserByUserName = (username) => {
  return Users.find((user) => user.username === username);
};

export const fakeAuthAPI = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUserName(username);
      const inputPassword = get(user, "password");
      console.log(user, inputPassword);
      if (inputPassword === password) {
        resolve({ success: true, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 2000);
  });
};

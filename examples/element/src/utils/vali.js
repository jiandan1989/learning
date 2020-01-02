export const validateUsername = (rule, value, callback) => {
  if (value !== 'admin') {
    callback(new Error('Please enter the user name is admin'));
  } else {
    callback();
  }
};


export const validatePassword = (rule, value, callback) => {
  if (value !== 'admin') {
    callback(new Error('Please enter the password is admin'));
  } else {
    callback();
  }
};

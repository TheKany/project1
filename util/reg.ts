export const utils = {
  regEx: {
    email: (param) => {
      return /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        param,
      );
    },
    password: (param) => {
      // 대/소문자 상관없이 8~15자까지 기호를 포함
      return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(param);
    },
  },
};

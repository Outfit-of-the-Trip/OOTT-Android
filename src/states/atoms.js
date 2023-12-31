import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfoState",
  default: {}
})

export const searchState = atom({
  key: "searchState", // 전역적으로 고유한 값
  default: "" 
});

export const dateState = atom({
  key: "dateState", // 전역적으로 고유한 값
  default: []
});

export const reasonState = atom({
  key: "reasonState", // 전역적으로 고유한 값
  default: "" 
});

export const friendsState = atom({
  key: "friendsState",
  default: []
})

export const categoryState = atom({
  key: "categoryState",
  default: ""
})

export const recommendDetailStates = atom({
  key: "recommendDetailStates",
  default: null
})

export const isUserFirstLogin = atom({
  key: "isUserFirstLogin",
  default:null
})

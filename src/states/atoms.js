import { atom } from "recoil";

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

export const userInfoState = atom({
  key: "userInfoState",
  default: {}
})

export const friendsState = atom({
  key: "friendsState",
  default: []
})

export const categoryState = atom({
  key: "categoryState",
  default: ""
})

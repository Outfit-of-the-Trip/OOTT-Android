import { atom } from "recoil";

export const searchState = atom({
  key: "searchState", // 전역적으로 고유한 값
  default: "" 
});

export const firstDateState = atom({
  key: "firstDateState", // 전역적으로 고유한 값
  default: "" 
});

export const lastDateState = atom({
  key: "lastDateState", // 전역적으로 고유한 값
  default: "" 
});

export const reasonState = atom({
  key: "reasonState", // 전역적으로 고유한 값
  default: "" 
});
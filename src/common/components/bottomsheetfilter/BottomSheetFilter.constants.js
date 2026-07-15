import { genreText } from "../photocard/PhotoCard.constants";

export const tabText = {
  grade: "등급",
  genre: "장르",
  status: "매진여부",
};

export const statusText = {
  ON_SALE: "판매중",
  SOLD_OUT: "품절",
};

export const optionTextMap = {
  genre: genreText,
  status: statusText,
};

export const INITIAL_SELECTED_OPTIONS = {
  grade: [],
  genre: [],
  status: [],
};

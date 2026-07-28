import { genreText } from "../photocard/PhotoCard.constants";

export const tabText = {
  grade: "등급",
  genre: "장르",
  saleType: "판매방법",
  status: "매진여부",
};

export const TAB_ORDER = ["grade", "genre", "saleType", "status"];

export const TAB_RESET_TARGET = {
  saleType: "status",
  status: "saleType",
};

export const statusText = {
  ON_SALE: "판매중",
  SOLD_OUT: "품절",
};

export const gradeText = {
  SUPER_RARE: "SUPER RARE",
};

export const optionTextMap = {
  grade: gradeText,
  genre: genreText,
  status: statusText,
};

export const INITIAL_SELECTED_OPTIONS = {
  grade: [],
  genre: [],
  saleType: [],
  status: [],
};

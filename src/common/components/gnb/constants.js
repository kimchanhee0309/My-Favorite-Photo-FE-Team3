export const MENU_ITEMS = [
  { label: "마켓플레이스", href: "/marketplace" },
  { label: "마이갤러리", href: "/gallery" },
  { label: "판매 중인 포토카드", href: "/my-sales" },
];

//고정 타이틀 맵
export const TITLE_MAP = {
  "/gallery": "마이갤러리",
  "/gallery/create": "포토카드 생성",
  "/my-sales": "나의 포토카드 판매하기",
  "/marketplace": "마켓플레이스",

  //TODO 빠진 경로 잇기 - 커밋과 pr에 이슈 #29첨부
};

export const SECONDARY_PREFIX_PATHS = [
  "/marketplace/", // marketplace/[id]/edit ...
  "/gallery/",
  "/my-sales",
];

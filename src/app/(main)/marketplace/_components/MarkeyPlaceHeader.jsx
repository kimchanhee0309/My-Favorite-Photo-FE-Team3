"use client";

import { useState } from "react";
import {
  Title,
  PrimaryButton,
  SearchInput,
  Dropdown,
} from "@/common/components";
import BottomSheetFilter from "@/common/components/bottomsheetfilter/BottomSheetFilter";

export default function MarketPlaceHeader() {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [isSoldOut, setIsSoldOut] = useState("");
  const [sortBy, setSortBy] = useState("낮은 가격순");

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const filterOptionsData = {
    grade: [
      { name: "COMMON", count: 12 },
      { name: "RARE", count: 5 },
      { name: "SUPER RARE", count: 2 },
      { name: "LEGENDARY", count: 1 },
    ],
    genre: [
      { name: "풍경 사진", count: 8 },
      { name: "인물 사진", count: 14 },
      { name: "여행 사진", count: 3 },
      { name: "동물 사진", count: 2 },
      { name: "사물 사진", count: 4 },
    ],
    isSoldOut: [
      { name: "판매중", count: 18 },
      { name: "품절", count: 5 },
    ],
  };

  const handleFilterApply = (tabName, selectedList) => {
    const selectedValue = selectedList[0] || "";

    if (tabName === "grade") setGrade(selectedValue);
    if (tabName === "genre") setGenre(selectedValue);
    if (tabName === "isSoldOut") setIsSoldOut(selectedValue);

    setIsBottomSheetOpen(false);
  };

  return (
    <div className="w-full border-gray-800 bg-black px-4 py-5 text-white md:px-6">
      <div className="mx-auto hidden w-full max-w-[1480px] flex-col items-start justify-between gap-4 md:mb-6 md:flex md:flex-row md:items-center">
        <Title
          size="responsive"
          variant="responsive"
          isBaskin="true"
          rightElement={
            <PrimaryButton
              thickness="thin"
              size={{ base: "S", md: "M", lg: "L" }}
              className="h-[60px] w-[235px] md:w-[342px] lg:h-[60px] lg:w-[440px]">
              나의 포토카드 판매하기
            </PrimaryButton>
          }>
          마켓플레이스
        </Title>
      </div>

      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center md:gap-0">
          <div className="w-full">
            <SearchInput
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="!w-full md:!w-[200px] lg:!w-[320px]"
            />
          </div>

          <div className="h-[1px] w-full bg-gray-400 md:hidden" />

          <div className="flex w-full items-center justify-between md:w-auto md:justify-start">
            <div className="md:hidden">
              <Dropdown
                variant="icon"
                options={[]}
                placeholder="필터"
                onClick={() => setIsBottomSheetOpen(true)}
              />

              <BottomSheetFilter
                isOpen={isBottomSheetOpen}
                filterOptions={filterOptionsData}
                onClose={() => setIsBottomSheetOpen(false)}
                onFilter={handleFilterApply}
              />
            </div>

            <div className="hidden items-center gap-[30px] md:ml-[30px] md:flex lg:ml-[60px] lg:gap-[45px]">
              <Dropdown
                label="등급"
                options={["COMMON", "RARE", "SUPER RARE", "LEGENDARY"]}
                variant="text"
                placeholder="등급"
                value={grade}
                onChange={(selected) => setGrade(selected)}
              />
              <Dropdown
                label="장르"
                options={[
                  "풍경 사진",
                  "인물 사진",
                  "여행 사진",
                  "동물 사진",
                  "사물 사진",
                ]}
                variant="text"
                placeholder="장르"
                value={genre}
                onChange={(selected) => setGenre(selected)}
              />
              <Dropdown
                label="매진여부"
                options={["판매중", "품절"]}
                variant="text"
                placeholder="매진여부"
                value={isSoldOut}
                onChange={(selected) => setIsSoldOut(selected)}
              />
            </div>

            <div className="md:hidden">
              <Dropdown
                label="낮은 가격순"
                options={["낮은 가격순", "높은 가격순"]}
                value={sortBy}
                onChange={(selected) => setSortBy(selected)}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:items-center">
          <Dropdown
            label="낮은 가격순"
            options={["낮은 가격순", "높은 가격순"]}
            value={sortBy}
            onChange={(selected) => setSortBy(selected)}
          />
        </div>
      </div>
    </div>
  );
}

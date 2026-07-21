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
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("낮은 가격순");

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const filterOptionsData = {
    grade: [
      { name: "COMMON", count: 52 },
      { name: "RARE", count: 16 },
      { name: "SUPER RARE", count: 5 },
      { name: "LEGENDARY", count: 5 },
    ],
    genre: [
      { name: "여행", count: 65 },
      { name: "풍경", count: 58 },
      { name: "인물", count: 101 },
      { name: "사물", count: 98 },
    ],
    status: [
      { name: "판매 중", count: 212 },
      { name: "판매 완료", count: 58 },
    ],
  };

  const handleFilterApply = (tabName, selectedList) => {
    const selectedValue = selectedList[0] || "";

    if (tabName === "grade") setGrade(selectedValue);
    if (tabName === "genre") setGenre(selectedValue);
    if (tabName === "status") setStatus(selectedValue);

    setIsBottomSheetOpen(false);
  };

  return (
    <div className="w-full bg-black px-[15px] py-5 md:px-5 md:py-10 lg:py-15">
      <div className="mx-auto hidden w-full max-w-[1480px] flex-col items-start justify-between md:flex md:flex-row md:items-center">
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

      <div className="mx-auto flex w-full max-w-[1480px] flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-[15px] md:w-auto md:flex-row md:items-center md:gap-0">
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

            <div className="hidden items-center md:ml-[30px] md:flex md:gap-[25px] lg:ml-[60px] lg:gap-[45px]">
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
                options={["풍경", "인물", "여행", "동물", "사물"]}
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
                value={status}
                onChange={(selected) => setStatus(selected)}
              />
            </div>

            <div className="md:hidden">
              <Dropdown
                label="낮은 가격순"
                options={["낮은 가격순", "높은 가격순", "최신순", "오래된순"]}
                value={sortBy}
                onChange={(selected) => setSortBy(selected)}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:items-center">
          <Dropdown
            label="낮은 가격순"
            options={["낮은 가격순", "높은 가격순", "최신순", "오래된순"]}
            value={sortBy}
            onChange={(selected) => setSortBy(selected)}
          />
        </div>
      </div>
    </div>
  );
}

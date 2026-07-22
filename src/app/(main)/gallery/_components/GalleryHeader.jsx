"use client";

import { useState } from "react";
import { PrimaryButton, SearchInput, Dropdown } from "@/common/components";
import Grade from "@/features/photocard/components/Grade";
import Title from "@/common/components/title/Title";
import BottomSheetFilter from "@/common/components/bottomsheetfilter/BottomSheetFilter";
import { useRouter } from "next/navigation";

export default function GalleryHeader() {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const router = useRouter();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const filterOptionsData = {
    grade: [
      { name: "COMMON", count: 20 },
      { name: "RARE", count: 8 },
      { name: "SUPER_RARE", count: 3 },
      { name: "LEGENDARY", count: 5 },
    ],
    genre: [
      { name: "풍경", count: 8 },
      { name: "인물", count: 14 },
      { name: "여행", count: 3 },
      { name: "동물", count: 2 },
      { name: "사물", count: 4 },
    ],
  };

  const totalCards = filterOptionsData.grade.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const handleFilterApply = (tabName, selectedList) => {
    const selectedValue = selectedList[0] || "";

    if (tabName === "grade") setGrade(selectedValue);
    if (tabName === "genre") setGenre(selectedValue);

    setIsBottomSheetOpen(false);
  };

  return (
    <div className="w-full bg-black px-[15px] py-5 md:px-5 md:py-10 lg:py-15">
      <div className="mx-auto hidden w-full max-w-[1480px] flex-col items-start justify-between gap-4 md:mb-5 md:flex md:flex-row md:items-center">
        <Title
          size="responsive"
          variant="responsive"
          isBaskin="true"
          rightElement={
            <PrimaryButton
              thickness="thin"
              size={{ base: "S", md: "M", lg: "L" }}
              className="h-[60px] w-[235px] md:w-[342px] lg:h-[60px] lg:w-[440px]"
              onClick={() => router.push("/gallery/create")}>
              포토카드 생성하기
            </PrimaryButton>
          }>
          마이갤러리
        </Title>
      </div>

      <div className="mx-auto mb-[15px] w-full max-w-[1480px] md:mb-5 lg:mb-10">
        <h2 className="mb-[15px] flex items-center gap-[5px] text-[14px] font-medium text-gray-200 md:mb-5 md:text-[20px] lg:mb-5 lg:gap-[10px] lg:text-[24px]">
          문치님이 보유한 포토카드
          <span className="text-[12px] font-normal text-gray-300 md:text-[18px] lg:text-[20px]">
            ({totalCards}장)
          </span>
        </h2>

        <div className="flex w-full [scrollbar-width:none] items-center gap-2.5 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] lg:gap-5 [&::-webkit-scrollbar]:hidden">
          {filterOptionsData.grade.map((item) => (
            <div key={item.name} className="flex-shrink-0">
              <Grade grade={item.name} quantity={item.count} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-[15px] h-[1px] w-full max-w-[1480px] bg-gray-400 md:mt-10 md:mb-5" />

      <div className="mx-auto flex w-full max-w-[1480px] flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between gap-[10px] md:w-auto md:justify-start">
          <div className="flex-shrink-0 md:hidden">
            <Dropdown
              variant="icon"
              options={[]}
              placeholder="필터"
              onClick={() => setIsBottomSheetOpen(true)}
              className="!h-[45px] !w-[45px]"
            />

            <BottomSheetFilter
              isOpen={isBottomSheetOpen}
              filterOptions={filterOptionsData}
              onClose={() => setIsBottomSheetOpen(false)}
              onFilter={handleFilterApply}
            />
          </div>

          <div className="w-full md:w-auto">
            <SearchInput
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="!w-full md:!w-[200px] lg:!w-[320px]"
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
          </div>
        </div>
      </div>
    </div>
  );
}

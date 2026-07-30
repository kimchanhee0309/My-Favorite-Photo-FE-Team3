"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import SearchInput from "@/common/components/input/SearchInput";
import { Dropdown } from "@/common/components";
import MyCard from "@/common/components/photocard/MyCard";
import BottomSheetFilter from "@/common/components/bottomsheetfilter/BottomSheetFilter";
import { genreLabelMap } from "@/features/photocard/components/genreLabelMap";
import { useMyOwnerships } from "@/features/ownership/ownership.queries";
import { mapOwnershipToCard } from "@/features/ownership/ownership.mapper";
import { toApiGrade, toDisplayGrade } from "@/common/utils/grade";

const GRADE_OPTIONS = ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"];
const GENRE_OPTIONS = Object.keys(genreLabelMap);

export default function ExchangeCardPicker({ onSelectCard }) {
  const [keyword, setKeyword] = useState("");
  const [gradeFilter, setGradeFilter] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isLoading, isError } = useMyOwnerships({ limit: 50 });

  const myPhotocards = useMemo(() => {
    const items = data?.data?.items ?? [];
    return items.map(mapOwnershipToCard);
  }, [data]);

  const filteredCards = useMemo(() => {
    return myPhotocards.filter((card) => {
      const matchesKeyword = card.title.includes(keyword.trim());
      const matchesGrade =
        gradeFilter.length === 0 || gradeFilter.includes(card.grade);
      const matchesGenre =
        genreFilter.length === 0 || genreFilter.includes(card.genre);
      return matchesKeyword && matchesGrade && matchesGenre;
    });
  }, [myPhotocards, keyword, gradeFilter, genreFilter]);

  const filterOptions = useMemo(
    () => ({
      grade: GRADE_OPTIONS.map((name) => ({
        name,
        count: myPhotocards.filter((c) => c.grade === name).length,
      })),
      genre: GENRE_OPTIONS.map((name) => ({
        name,
        count: myPhotocards.filter((c) => c.genre === name).length,
      })),
    }),
    [myPhotocards],
  );

  const handleGenreChange = (label) => {
    const code = Object.entries(genreLabelMap).find(
      ([, value]) => value === label,
    )?.[0];
    setGenreFilter(code ? [code] : []);
  };

  const handleFilterApply = (tab, selected) => {
    if (tab === "grade") setGradeFilter(selected);
    else if (tab === "genre") setGenreFilter(selected);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <p className="font-['BaskinRobbins'] text-[14px] leading-normal font-normal tracking-[-0.42px] text-gray-300 md:text-[16px] md:tracking-[-0.48px] lg:text-[24px] lg:tracking-[-0.72px]">
          마이갤러리
        </p>
        <h2 className="font-['BaskinRobbins'] text-[26px] leading-normal font-normal tracking-[-0.78px] text-white md:mb-[20px] md:border-b-2 md:border-gray-100 md:pb-[20px] md:text-[40px] md:tracking-[-1.2px] lg:text-[46px] lg:tracking-[-1.38px]">
          포토카드 교환하기
        </h2>
      </div>

      <div className="hidden items-center gap-2.5 md:flex">
        <div className="hidden items-center md:flex">
          <SearchInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색"
          />
          <Dropdown
            variant="text"
            options={GRADE_OPTIONS.map(toDisplayGrade)}
            value={gradeFilter[0] ? toDisplayGrade(gradeFilter[0]) : null}
            placeholder="등급"
            onChange={(v) => setGradeFilter(v ? [toApiGrade(v)] : [])}
            className="ml-[25px] lg:ml-[60px]"
          />
          <Dropdown
            variant="text"
            options={Object.values(genreLabelMap)}
            value={genreFilter[0] ? genreLabelMap[genreFilter[0]] : null}
            placeholder="장르"
            onChange={handleGenreChange}
            className="ml-[20px] lg:ml-[45px]"
          />
        </div>
      </div>

      {/* 모바일 검색+필터 */}
      <div className="relative flex items-center gap-2.5 md:hidden">
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xs border border-gray-200 bg-black"
          aria-label="필터">
          <Image
            src="/filter.png"
            alt="필터"
            width={24}
            height={24}
            className="h-[24px] w-[24px]"
          />
        </button>

        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색"
        />

        <BottomSheetFilter
          isOpen={isFilterOpen}
          filterOptions={filterOptions}
          onClose={() => setIsFilterOpen(false)}
          onFilter={handleFilterApply}
        />
      </div>

      <div className="flex flex-1 flex-wrap gap-[5px] overflow-y-auto md:gap-[15px]">
        {isLoading && <p className="text-white">불러오는 중...</p>}
        {isError && <p className="text-white">목록을 불러오지 못했습니다.</p>}
        {!isLoading && !isError && filteredCards.length === 0 && (
          <p className="text-gray-300">교환 제시 가능한 포토카드가 없습니다.</p>
        )}
        {filteredCards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectCard(card)}
            className="text-left">
            <MyCard
              imageUrl={card.imageUrl}
              title={card.title}
              grade={card.grade}
              genre={card.genre}
              description={card.description}
              minPrice={card.minPrice}
              quantity={card.quantity}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

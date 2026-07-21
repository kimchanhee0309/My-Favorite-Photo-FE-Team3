"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import SearchInput from "@/common/components/input/SearchInput";
import Dropdown from "@/common/components/dropdown/Dropdown";
import MyCard from "@/common/components/photocard/MyCard";
import BottomSheetFilter from "@/common/components/bottomsheetfilter/BottomSheetFilter";
import { genreLabelMap } from "@/features/photocard/components/genreLabelMap";

const GRADE_OPTIONS = ["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"];
const GENRE_OPTIONS = Object.keys(genreLabelMap);

// TODO: ownership.api.js가 비어있어 임시 mock 데이터 사용. 실제 "내 소유 포토카드 목록" API 연결 필요.
const MOCK_MY_PHOTOCARDS = [
  { id: 1, imageUrl: "/cho.jpeg", title: "스페인 여행", description: "최애의포토", grade: "RARE", genre: "TRAVEL", minPrice: 400, quantity: 2 },
  { id: 2, imageUrl: "/cho.jpeg", title: "우리집 앞마당", description: "최애의포토", grade: "COMMON", genre: "LANDSCAPE", minPrice: 100, quantity: 1 },
  { id: 3, imageUrl: "/cho.jpeg", title: "How Far I'll Go", description: "최애의포토", grade: "SUPER_RARE", genre: "LANDSCAPE", minPrice: 700, quantity: 1 },
  { id: 4, imageUrl: "/cho.jpeg", title: "겨울 왕국", description: "최애의포토", grade: "LEGENDARY", genre: "LANDSCAPE", minPrice: 900, quantity: 3 },
];

export default function ExchangeCardPicker({ onSelectCard }) {
  const [keyword, setKeyword] = useState("");
  const [gradeFilter, setGradeFilter] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCards = useMemo(() => {
    return MOCK_MY_PHOTOCARDS.filter((card) => {
      const matchesKeyword = card.title.includes(keyword.trim());
      const matchesGrade = gradeFilter.length === 0 || gradeFilter.includes(card.grade);
      const matchesGenre = genreFilter.length === 0 || genreFilter.includes(card.genre);
      return matchesKeyword && matchesGrade && matchesGenre;
    });
  }, [keyword, gradeFilter, genreFilter]);

  const filterOptions = useMemo(
    () => ({
      grade: GRADE_OPTIONS.map((name) => ({
        name,
        count: MOCK_MY_PHOTOCARDS.filter((c) => c.grade === name).length,
      })),
      genre: GENRE_OPTIONS.map((name) => ({
        name,
        count: MOCK_MY_PHOTOCARDS.filter((c) => c.genre === name).length,
      })),
    }),
    [],
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

      {/* 데스크탑/태블릿 검색+필터 */}
      <div className="hidden items-center gap-2.5 md:flex">
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색"
        />
        <Dropdown
          variant="sort"
          options={GRADE_OPTIONS}
          value={gradeFilter[0] ?? null}
          placeholder="등급"
          onChange={(v) => setGradeFilter(v ? [v] : [])}
          className="border-none! border-transparent!"
        />
        <Dropdown
          variant="sort"
          options={Object.values(genreLabelMap)}
          value={genreFilter[0] ? genreLabelMap[genreFilter[0]] : null}
          placeholder="장르"
          onChange={handleGenreChange}
          className="border-none! border-transparent!"
        />
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
"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Title,
  PrimaryButton,
  SearchInput,
  Dropdown,
} from "@/common/components";
import BottomSheetFilter from "@/common/components/bottomsheetfilter/BottomSheetFilter";

const GENRE_MAP = {
  "풍경 사진": "LANDSCAPE",
  "인물 사진": "PORTRAIT",
  "여행 사진": "TRAVEL",
  "동물 사진": "ANIMAL",
  "사물 사진": "OBJECT",
  기타: "ETC",
};

const SORT_MAP = {
  "낮은 가격순": "price_asc",
  "높은 가격순": "price_desc",
  최신순: "newest",
  오래된순: "oldest",
};

const STATUS_MAP = {
  판매중: "ON_SALE",
  품절: "SOLD_OUT",
};

const REVERSE_GENRE_MAP = Object.fromEntries(
  Object.entries(GENRE_MAP).map(([k, v]) => [v, k]),
);
const REVERSE_SORT_MAP = Object.fromEntries(
  Object.entries(SORT_MAP).map(([k, v]) => [v, k]),
);
const REVERSE_STATUS_MAP = Object.fromEntries(
  Object.entries(STATUS_MAP).map(([k, v]) => [v, k]),
);

export default function MarketplaceHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  const rawGrade = searchParams.get("grade") || "";
  const currentGradeParam = rawGrade.replace(/[\s+]+/g, "_");

  const currentGenreParam = searchParams.get("genre") || "";
  const currentStatusParam = searchParams.get("status") || "";
  const currentSortParam = searchParams.get("sort") || "price_asc";

  const genre = REVERSE_GENRE_MAP[currentGenreParam] || "";
  const status = REVERSE_STATUS_MAP[currentStatusParam] || "";
  const sortBy = REVERSE_SORT_MAP[currentSortParam] || "낮은 가격순";

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToggleQuery = (key, newValue, currentValue) => {
    if (currentValue === newValue) {
      updateQuery(key, "");
    } else {
      updateQuery(key, newValue);
    }
  };

  const filterOptionsData = {
    grade: [
      { name: "COMMON", count: 12 },
      { name: "RARE", count: 5 },
      { name: "SUPER_RARE", count: 2 },
      { name: "LEGENDARY", count: 1 },
    ],
    genre: [
      { name: "풍경 사진", count: 8 },
      { name: "인물 사진", count: 14 },
      { name: "여행 사진", count: 3 },
      { name: "동물 사진", count: 2 },
      { name: "사물 사진", count: 4 },
    ],
    status: [
      { name: "판매중", count: 18 },
      { name: "품절", count: 5 },
    ],
  };

  const handleFilterApply = (selectedOptions) => {
    const params = new URLSearchParams(searchParams.toString());

    const selectedGrade = selectedOptions.grade?.[0] || "";
    if (selectedGrade) {
      params.set("grade", selectedGrade);
    } else {
      params.delete("grade");
    }

    const selectedGenreName = selectedOptions.genre?.[0] || "";
    const apiGenre = GENRE_MAP[selectedGenreName] || "";
    if (apiGenre) {
      params.set("genre", apiGenre);
    } else {
      params.delete("genre");
    }

    const selectedStatusName = selectedOptions.status?.[0] || "";
    const apiStatus = STATUS_MAP[selectedStatusName] || "";
    if (apiStatus) {
      params.set("status", apiStatus);
    } else {
      params.delete("status");
    }

    router.push(`${pathname}?${params.toString()}`);
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
              onChange={(e) => updateQuery("search", e.target.value)}
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
                options={["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"]}
                variant="text"
                placeholder="등급"
                value={currentGradeParam}
                onChange={(selected) =>
                  handleToggleQuery("grade", selected, currentGradeParam)
                }
              />
              <Dropdown
                label="장르"
                options={[
                  "풍경 사진",
                  "인물 사진",
                  "여행 사진",
                  "동물 사진",
                  "사물 사진",
                  "기타",
                ]}
                variant="text"
                placeholder="장르"
                value={genre}
                onChange={(selected) =>
                  handleToggleQuery(
                    "genre",
                    GENRE_MAP[selected],
                    currentGenreParam,
                  )
                }
              />
              <Dropdown
                label="매진여부"
                options={["판매중", "품절"]}
                variant="text"
                placeholder="매진여부"
                value={status}
                onChange={(selected) =>
                  handleToggleQuery(
                    "status",
                    STATUS_MAP[selected],
                    currentStatusParam,
                  )
                }
              />
            </div>

            <div className="md:hidden">
              <Dropdown
                label="낮은 가격순"
                options={["낮은 가격순", "높은 가격순"]}
                value={sortBy}
                onChange={(selected) => updateQuery("sort", SORT_MAP[selected])}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:items-center">
          <Dropdown
            label="낮은 가격순"
            options={["낮은 가격순", "높은 가격순"]}
            value={sortBy}
            onChange={(selected) => updateQuery("sort", SORT_MAP[selected])}
          />
        </div>
      </div>
    </div>
  );
}

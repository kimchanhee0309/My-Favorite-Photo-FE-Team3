"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Title, SearchInput, Dropdown } from "@/common/components";
import Grade from "@/features/photocard/components/Grade";
import BottomSheetFilter from "@/common/components/bottomsheetfilter/BottomSheetFilter";
import { useAuth } from "@/providers/AuthProvider";

const GRADE_MAP = {
  COMMON: "COMMON",
  RARE: "RARE",
  "SUPER RARE": "SUPER_RARE",
  LEGENDARY: "LEGENDARY",
};

const GENRE_MAP = {
  "풍경 사진": "LANDSCAPE",
  "인물 사진": "PORTRAIT",
  "여행 사진": "TRAVEL",
  "동물 사진": "ANIMAL",
  "사물 사진": "OBJECT",
  기타: "ETC",
};

const SALE_TYPE_MAP = {
  판매: "SALE",
  교환: "EXCHANGE",
};

const STATUS_MAP = {
  판매중: "ON_SALE",
  품절: "SOLD_OUT",
};

const REVERSE_GRADE_MAP = Object.fromEntries(
  Object.entries(GRADE_MAP).map(([k, v]) => [v, k]),
);
const REVERSE_GENRE_MAP = Object.fromEntries(
  Object.entries(GENRE_MAP).map(([k, v]) => [v, k]),
);
const REVERSE_SALE_TYPE_MAP = Object.fromEntries(
  Object.entries(SALE_TYPE_MAP).map(([k, v]) => [v, k]),
);
const REVERSE_STATUS_MAP = Object.fromEntries(
  Object.entries(STATUS_MAP).map(([k, v]) => [v, k]),
);

export default function MySalesHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const { data: salesCounts } = useQuery({
    queryKey: ["mySalesFilterCounts"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop-listings/me/count`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("나의 판매 포토카드 데이터를 불러오지 못했습니다.");
      }
      const result = await response.json();
      return result.data;
    },
  });

  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  const currentGradeParam = searchParams.get("grade") || "";
  const currentGenreParam = searchParams.get("genre") || "";
  const currentSaleTypeParam = searchParams.get("saleType") || "";
  const currentStatusParam = searchParams.get("status") || "";

  const grade = REVERSE_GRADE_MAP[currentGradeParam] || "";
  const genre = REVERSE_GENRE_MAP[currentGenreParam] || "";
  const saleType = REVERSE_SALE_TYPE_MAP[currentSaleTypeParam] || "";
  const status = REVERSE_STATUS_MAP[currentStatusParam] || "";

  const nickname = user?.nickname || "문치";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== initialSearch) {
        updateQuery("search", searchValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  const handleToggleQuery = (key, newValue, currentValue) => {
    if (currentValue === newValue) {
      updateQuery(key, "");
    } else {
      updateQuery(key, newValue);
    }
  };

  const filterOptionsData = {
    grade: [
      { name: "COMMON", count: salesCounts?.grade?.COMMON ?? 0 },
      { name: "RARE", count: salesCounts?.grade?.RARE ?? 0 },
      { name: "SUPER_RARE", count: salesCounts?.grade?.SUPER_RARE ?? 0 },
      { name: "LEGENDARY", count: salesCounts?.grade?.LEGENDARY ?? 0 },
    ],
    genre: Object.keys(GENRE_MAP).map((uiName) => ({
      name: uiName,
      count: salesCounts?.genre?.[GENRE_MAP[uiName]] ?? 0,
    })),
    saleType: Object.keys(SALE_TYPE_MAP).map((uiName) => ({
      name: uiName,
      count: salesCounts?.saleType?.[SALE_TYPE_MAP[uiName]] ?? 0,
    })),
    status: Object.keys(STATUS_MAP).map((uiName) => ({
      name: uiName,
      count: salesCounts?.status?.[STATUS_MAP[uiName]] ?? 0,
    })),
  };

  const totalCards =
    salesCounts?.total ??
    filterOptionsData.grade.reduce((sum, item) => sum + item.count, 0);

  const handleFilterApply = (selectedOptions) => {
    const params = new URLSearchParams(searchParams.toString());

    const selectedGrade = selectedOptions.grade?.[0] || "";
    if (selectedGrade) {
      params.set("grade", GRADE_MAP[selectedGrade] || selectedGrade);
    } else {
      params.delete("grade");
    }

    const selectedGenreName = selectedOptions.genre?.[0] || "";
    const apiGenre = GENRE_MAP[selectedGenreName] || selectedGenreName;
    if (apiGenre) {
      params.set("genre", apiGenre);
    } else {
      params.delete("genre");
    }

    const selectedSaleTypeName = selectedOptions.saleType?.[0] || "";
    const apiSaleType =
      SALE_TYPE_MAP[selectedSaleTypeName] || selectedSaleTypeName;
    if (apiSaleType) {
      params.set("saleType", apiSaleType);
    } else {
      params.delete("saleType");
    }

    const selectedStatusName = selectedOptions.status?.[0] || "";
    const apiStatus = STATUS_MAP[selectedStatusName] || selectedStatusName;
    if (apiStatus) {
      params.set("status", apiStatus);
    } else {
      params.delete("status");
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="w-full bg-black px-[15px] py-5 text-white md:px-5 md:py-10 lg:py-15">
      <div className="mx-auto hidden w-full max-w-[1480px] flex-col items-start justify-between gap-4 md:mb-5 md:flex md:flex-row md:items-center">
        <Title size="responsive" variant="responsive" isBaskin="true">
          나의 판매 포토카드
        </Title>
      </div>

      <div className="mx-auto mb-[15px] w-full max-w-[1480px] md:mb-5 lg:mb-10">
        <h2 className="mb-[15px] flex items-center gap-[5px] text-[14px] font-medium text-gray-200 md:mb-5 md:text-[20px] lg:mb-5 lg:gap-[10px] lg:text-[24px]">
          {nickname}님이 보유한 포토카드
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
              totalCount={totalCards}
              onClose={() => setIsBottomSheetOpen(false)}
              onFilter={handleFilterApply}
            />
          </div>

          <div className="w-full md:w-auto">
            <SearchInput
              placeholder="검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
              onChange={(selected) =>
                handleToggleQuery(
                  "grade",
                  GRADE_MAP[selected],
                  currentGradeParam,
                )
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
              label="판매방법"
              options={["판매", "교환"]}
              variant="text"
              placeholder="판매방법"
              value={saleType}
              onChange={(selected) =>
                handleToggleQuery(
                  "saleType",
                  SALE_TYPE_MAP[selected],
                  currentSaleTypeParam,
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
        </div>
      </div>
    </div>
  );
}

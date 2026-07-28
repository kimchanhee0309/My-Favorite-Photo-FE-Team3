"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Title,
  PrimaryButton,
  SearchInput,
  Dropdown,
} from "@/common/components";
import BottomSheetFilter from "@/common/components/bottomsheetfilter/BottomSheetFilter";
import SellPhotocardModal from "@/features/shopListing/components/SellPhotocardModal";
import ConfirmModal from "@/common/components/confirmmodal/ConfirmModal";
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

const SORT_MAP = {
  "낮은 가격순": "price_asc",
  "높은 가격순": "price_desc",
  최신순: "latest",
  오래된순: "oldest",
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
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: filterCounts } = useQuery({
    queryKey: ["shopListingFilterCounts"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop-listings/count`,
      );
      if (!response.ok) {
        throw new Error("마켓플레이스 데이터를 불러오지 못했습니다.");
      }
      const result = await response.json();
      return result.data;
    },
  });

  const initialSearch = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState(initialSearch);

  const currentGradeParam = searchParams.get("grade") || "";
  const currentGenreParam = searchParams.get("genre") || "";
  const currentStatusParam = searchParams.get("status") || "";
  const currentSortParam = searchParams.get("sort") || "price_asc";

  const grade = REVERSE_GRADE_MAP[currentGradeParam] || "";
  const genre = REVERSE_GENRE_MAP[currentGenreParam] || "";
  const status = REVERSE_STATUS_MAP[currentStatusParam] || "";
  const sortBy = REVERSE_SORT_MAP[currentSortParam] || "낮은 가격순";

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
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

  const handleDropdownChange = (key, selectedOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedOption === "전체") {
      params.delete(key);
    } else {
      const mapObj = {
        grade: GRADE_MAP,
        genre: GENRE_MAP,
        status: STATUS_MAP,
      }[key];

      const apiValue = mapObj?.[selectedOption] || selectedOption;
      if (apiValue) {
        params.set(key, apiValue);
      } else {
        params.delete(key);
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const filterOptionsData = {
    grade: [
      { name: "COMMON", count: filterCounts?.grade?.COMMON ?? 0 },
      { name: "RARE", count: filterCounts?.grade?.RARE ?? 0 },
      { name: "SUPER_RARE", count: filterCounts?.grade?.SUPER_RARE ?? 0 },
      { name: "LEGENDARY", count: filterCounts?.grade?.LEGENDARY ?? 0 },
    ],
    genre: Object.keys(GENRE_MAP).map((uiName) => ({
      name: uiName,
      count: filterCounts?.genre?.[GENRE_MAP[uiName]] ?? 0,
    })),
    status: Object.keys(STATUS_MAP).map((uiName) => ({
      name: uiName,
      count: filterCounts?.status?.[STATUS_MAP[uiName]] ?? 0,
    })),
  };

  const handleFilterApply = (selectedOptions) => {
    const params = new URLSearchParams(searchParams.toString());

    const selectedGrade = selectedOptions.grade?.[0] || "";
    if (selectedGrade) {
      const apiGrade = GRADE_MAP[selectedGrade] || selectedGrade;
      params.set("grade", apiGrade);
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

    const selectedStatusName = selectedOptions.status?.[0] || "";
    const apiStatus = STATUS_MAP[selectedStatusName] || selectedStatusName;
    if (apiStatus) {
      params.set("status", apiStatus);
    } else {
      params.delete("status");
    }

    router.replace(`${pathname}?${params.toString()}`);
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
              onClick={() => {
                if (!user) return setIsModalOpen(true);
                return setIsSellModalOpen(true);
              }}
              className="h-[60px] w-[235px] md:w-[342px] lg:h-[60px] lg:w-[440px]">
              나의 포토카드 판매하기
            </PrimaryButton>
          }>
          마켓플레이스
        </Title>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => router.push("/login")}
        title="로그인이 필요합니다"
        message={
          <>
            로그인 하시겠습니까?
            <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </>
        }
        confirmLabel="확인"
      />

      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center md:gap-0">
          <div className="w-full">
            <SearchInput
              placeholder="검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
                options={["전체", "COMMON", "RARE", "SUPER RARE", "LEGENDARY"]}
                variant="text"
                placeholder="등급"
                value={grade}
                onChange={(selected) => handleDropdownChange("grade", selected)}
              />
              <Dropdown
                label="장르"
                options={[
                  "전체",
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
                onChange={(selected) => handleDropdownChange("genre", selected)}
              />
              <Dropdown
                label="매진여부"
                options={["전체", "판매중", "품절"]}
                variant="text"
                placeholder="매진여부"
                value={status}
                onChange={(selected) =>
                  handleDropdownChange("status", selected)
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

      <SellPhotocardModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
    </div>
  );
}

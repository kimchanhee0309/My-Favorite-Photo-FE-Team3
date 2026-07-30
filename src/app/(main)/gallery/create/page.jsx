"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/common/components/input/Input";
import SelectInput from "@/common/components/input/SelectInput";
import Textarea from "@/common/components/input/Textarea";
import ImageUpload from "@/common/components/input/ImageUpload";
import PrimaryButton from "@/common/components/button/PrimaryButton";
import Title from "@/common/components/title/Title";
import { genreLabelMap } from "@/features/photocard/components/genreLabelMap";
import { useCreatePhotocard } from "@/features/photocard/photocard.queries";
import { uploadImageToCloudinary } from "@/common/api/cloudinary";

const gradeLabelMap = {
  COMMON: "COMMON",
  RARE: "RARE",
  SUPER_RARE: "SUPER RARE",
  LEGENDARY: "LEGENDARY",
};

const GENRE_LABEL_OPTIONS = Object.values(genreLabelMap);
const GRADE_LABEL_OPTIONS = Object.values(gradeLabelMap);

export default function CreatePhotoCardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    genre: "",
    price: "",
    supply: "",
    description: "",
    image: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: createPhotocard, isPending } = useCreatePhotocard();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGradeChange = (label) => {
    const code = Object.entries(gradeLabelMap).find(
      ([, value]) => value === label,
    )?.[0];
    handleChange("grade", code ?? "");
  };

  const handleGenreChange = (label) => {
    const code = Object.entries(genreLabelMap).find(
      ([, value]) => value === label,
    )?.[0];
    handleChange("genre", code ?? "");
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    handleChange("price", rawValue);
  };

  const handleSupplyChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    handleChange("supply", rawValue);
  };

  const supplyError =
    formData.supply && Number(formData.supply) > 10
      ? "총 발행량은 10장 이하로 선택 가능합니다."
      : "";

  const isValid =
    formData.name &&
    formData.grade &&
    formData.genre &&
    formData.price &&
    formData.supply &&
    Number(formData.supply) <= 10 &&
    formData.description &&
    formData.image;

  const buildResultUrl = (status) => {
    const query = new URLSearchParams({
      status,
      grade: formData.grade,
      name: formData.name,
    });
    return `/gallery/create-result?${query.toString()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isUploading || isPending) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadImageToCloudinary(formData.image);
      setIsUploading(false);

      createPhotocard(
        {
          name: formData.name,
          description: formData.description,
          imageUrl,
          genre: formData.genre,
          grade: formData.grade,
          minPrice: formData.price,
          totalQuantity: formData.supply,
        },
        {
          onSuccess: () => router.push(buildResultUrl("success")),
          onError: () => router.push(buildResultUrl("error")),
        },
      );
    } catch {
      setIsUploading(false);
      router.push(buildResultUrl("error"));
    }
  };

  return (
    <div className="layout-container flex w-full flex-col items-center pt-[30px] pb-20 md:pt-10">
      <Title
        size="responsive"
        isBaskin={true}
        variant="responsive"
        className="hidden md:block">
        포토카드 생성
      </Title>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-[30px] md:mt-[60px] md:gap-10">
        <Input
          label="포토카드 이름"
          placeholder="포토카드 이름을 입력해 주세요"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <SelectInput
          label="등급"
          placeholder="등급을 선택해 주세요"
          options={GRADE_LABEL_OPTIONS}
          value={formData.grade ? gradeLabelMap[formData.grade] : ""}
          onChange={handleGradeChange}
        />

        <SelectInput
          label="장르"
          placeholder="장르를 선택해 주세요"
          options={GENRE_LABEL_OPTIONS}
          value={formData.genre ? genreLabelMap[formData.genre] : ""}
          onChange={handleGenreChange}
        />

        <Input
          label="가격"
          type="text"
          placeholder="가격을 입력해 주세요"
          value={formData.price ? `${formData.price}` : ""}
          onChange={handlePriceChange}
        />

        <Input
          label="총 발행량"
          type="text"
          placeholder="총 발행량을 입력해 주세요"
          value={formData.supply}
          onChange={handleSupplyChange}
          error={supplyError}
        />

        <ImageUpload
          label="사진 업로드"
          className="w-[345px] md:w-[440px] lg:w-[520px]"
          onChange={(file) => handleChange("image", file)}
        />

        <Textarea
          label="포토카드 설명"
          placeholder="카드 설명을 입력해 주세요"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <PrimaryButton
          type="submit"
          thickness="thin"
          disabled={!isValid || isUploading || isPending}
          className="!typo-18-bold mt-5 h-[55px] w-[345px] md:w-[440px] lg:h-[60px] lg:w-[520px]">
          생성하기
        </PrimaryButton>
      </form>
    </div>
  );
}

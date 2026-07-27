"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/common/components/input/Input";
import SelectInput from "@/common/components/input/SelectInput";
import Textarea from "@/common/components/input/Textarea";
import ImageUpload from "@/common/components/input/ImageUpload";
import PrimaryButton from "@/common/components/button/PrimaryButton";
import Title from "@/common/components/title/Title";

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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    //실제 포토카드 생성 API 붙으면 여기서 mutate 호출 후 성공/실패에 따라 status 분기
    const query = new URLSearchParams({
      status: "success",
      grade: formData.grade,
      name: formData.name,
    });
    router.push(`/gallery/create-result?${query.toString()}`);
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
          options={["COMMON", "RARE", "SUPER_RARE", "LEGENDARY"]}
          value={formData.grade}
          onChange={(val) => handleChange("grade", val)}
        />

        <SelectInput
          label="장르"
          placeholder="장르를 선택해 주세요"
          options={["풍경", "인물", "사물", "기타"]}
          value={formData.genre}
          onChange={(val) => handleChange("genre", val)}
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
          disabled={!isValid}
          className="!typo-18-bold mt-5 h-[55px] w-[345px] md:w-[440px] lg:h-[60px] lg:w-[520px]">
          생성하기
        </PrimaryButton>
      </form>
    </div>
  );
}

export const GRADE_OPTIONS = ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"];

export const toApiGrade = (grade) => grade?.replace(" ", "_");

export const toDisplayGrade = (grade) => grade?.replace("_", " ");

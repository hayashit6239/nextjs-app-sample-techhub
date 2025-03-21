import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ResTechtopic } from "./server-response-types";
import { TechCategoryTopic } from "@/app/projects/[id]/_containers/project-techtopic-list/presentational";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// プロジェクトに紐づく技術トピックをカテゴリごとに分類する
export function transformTechtopicsToTechCategoryTopics (techtopics: ResTechtopic[]): TechCategoryTopic[] {
  const techCategoryTopics: { [techcategoryName: string]: ResTechtopic[] } = {};

  techtopics.forEach(item => {
      if (!techCategoryTopics[item.techcategoryName]) {
          techCategoryTopics[item.techcategoryName] = [];
      }
      techCategoryTopics[item.techcategoryName].push(item);
  });

  return Object.keys(techCategoryTopics).map(techcategoryName => {
      return {
          techCategoryName: techcategoryName,
          techtopics: techCategoryTopics[techcategoryName]
      }
  })
}

// 重複する技術の ID と名前の組み合わせを削除する
export const removeDuplicateObjects = (techtopics: { id: number, name: string }[]): { id: number, name: string }[] => {
  const seen = new Set();
  return techtopics.filter(item => {
      const keyValue = item.id;
      if (seen.has(keyValue)) {
          return false;
      }
      seen.add(keyValue);
      return true;
  });
};

// Loading の確認のための遅延処理
export const sleep = async (milliseconds: number) => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
};
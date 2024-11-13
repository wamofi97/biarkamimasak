import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseRecipeData = (data) => {
  // Extract the title
  const titleMatch = data.match(/### Title: (.+?) \*\*/);
  const title = titleMatch ? titleMatch[1] : "Recipe";

  // Extract the ingredients
  const ingredientsMatch = data.match(/Complete Ingredients List:\*\* (.+?) \*\*/);
  const ingredientsList = ingredientsMatch ? ingredientsMatch[1] : "";
  const ingredients = ingredientsList.split(" - ").map(item => item.trim()).filter(Boolean);

  // Extract the instructions
  const instructionsMatch = data.match(/Step-by-Step Instructions:\*\* (.+?) \*\*/);
  const instructionsList = instructionsMatch ? instructionsMatch[1] : "";
  const instructions = instructionsList.split(/\d+\./).map(step => step.trim()).filter(Boolean);

  // Extract additional info (cooking time and difficulty level)
  const cookingTimeMatch = data.match(/Cooking Time:\*\* (.+?) \*\*/);
  const cookingTime = cookingTimeMatch ? cookingTimeMatch[1] : "";

  const difficultyLevelMatch = data.match(/Difficulty Level:\*\* (.+?)(\n|$)/);
  const difficultyLevel = difficultyLevelMatch ? difficultyLevelMatch[1] : "";

  return { title, ingredients, instructions, cookingTime, difficultyLevel };
};
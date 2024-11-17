import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Delete, Plus } from "lucide-react";
import { Badge } from "./ui/badge";
import LoadingSpinner from "./loading-spinner";
import ShiningText from "./shiningtext";
// import RecipeCard from "./recipe-card";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: { number: string; text: string }[];
  cookingTime: string;
  difficulty: string;
  notes: { type: "text" | "bullet"; content: string }[];
}

export default function IngredientInputSection() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    ingredients: [],
    instructions: [],
    cookingTime: "",
    difficulty: "",
    notes: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState(null);
  const [hasSearch, setHasSearch] = useState<boolean>(false);

  const parseRecipeText = (text: string) => {
    const sections = text.split("\n");
    const newRecipe: Recipe = {
      title: "",
      ingredients: [],
      instructions: [],
      cookingTime: "",
      difficulty: "",
      notes: [],
    };

    let currentSection: string = "";

    sections.forEach((section) => {
      const trimmedSection = section.trim();

      if (trimmedSection.startsWith("TITLE:")) {
        newRecipe.title = trimmedSection.replace("TITLE:", "").trim();
      } else if (trimmedSection.startsWith("INGREDIENTS:")) {
        currentSection = "ingredients";
      } else if (trimmedSection.startsWith("INSTRUCTIONS:")) {
        currentSection = "instructions";
      } else if (trimmedSection.startsWith("COOKING TIME:")) {
        newRecipe.cookingTime = trimmedSection
          .replace("COOKING TIME:", "")
          .trim();
        currentSection = "";
      } else if (trimmedSection.startsWith("DIFFICULTY:")) {
        newRecipe.difficulty = trimmedSection.replace("DIFFICULTY:", "").trim();
        currentSection = "";
      } else if (trimmedSection.startsWith("NOTES:")) {
        currentSection = "notes";
        const notesContent = trimmedSection.replace("NOTES:", "").trim();
        if (notesContent) {
          if (notesContent.startsWith("-")) {
            const noteText = notesContent.substring(1).trim();
            newRecipe.notes.push({ type: "bullet", content: noteText });
          } else {
            newRecipe.notes.push({ type: "text", content: notesContent });
          }
        }
      } else if (
        trimmedSection &&
        currentSection === "ingredients" &&
        trimmedSection.startsWith("-")
      ) {
        newRecipe.ingredients.push(trimmedSection.substring(1).trim());
      } else if (
        trimmedSection &&
        currentSection === "instructions" &&
        /^\d+\./.test(trimmedSection)
      ) {
        const number = trimmedSection.substring(0, trimmedSection.indexOf("."));
        const text = trimmedSection
          .substring(trimmedSection.indexOf(".") + 1)
          .trim();
        newRecipe.instructions.push({ number, text });
      } else if (trimmedSection && currentSection === "notes") {
        if (trimmedSection.startsWith("-")) {
          newRecipe.notes.push({
            type: "bullet",
            content: trimmedSection.substring(1).trim(),
          });
        } else {
          newRecipe.notes.push({
            type: "text",
            content: trimmedSection,
          });
        }
      }
    });

    return newRecipe;
  };

  const handleSearch = async () => {
    setLoading(true);
    setHasSearch(true);
    setRecipe({
      title: "",
      ingredients: [],
      instructions: [],
      cookingTime: "",
      difficulty: "",
      notes: [],
    });
    try {
      const response = await fetch(
        "https://biarkamimasak-api.fahmifauzi.my/v1/recipe/simple/stream",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "X-Recipe-API-Key": import.meta.env.RECIPE_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients }),
        }
      );

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        accumulatedText += chunk;

        // Parse and update the recipe state
        const parsedRecipe = parseRecipeText(accumulatedText);
        setRecipe(parsedRecipe);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
      setIngredientInput("");
    }
  };

  // Handle adding ingredients
  const addIngredient = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput)) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientInput(e.target.value);
  };

  // Handle key down (Enter to add ingredient)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  // Handle ingredient removal
  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  return (
    <div
      className={`w-full ${
        hasSearch ? "flex" : " max-w-2xl"
      } justify-center flex-wrap gap-x-8 gap-y-4 mx-auto my-4 sm:px-12 px-6 py-8 bg-neutral-50 dark:bg-neutral-900/10 border rounded-lg shadow-md`}
    >
      {!hasSearch ? null : loading ? (
        <div className="flex justify-end">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="flex flex-col justify-center items-center">
          <h4 className="opacity-80 text-sm text-center">
            We have let him cook, now we gonna{" "}
            <ShiningText
              text="let you cook ✨"
              className="inline-block"
              color="text-yellow-500 dark:text-yellow-300"
            />
          </h4>
          {/* <RecipeCard recipe={recipe} /> */}
        </section>
      )}

      {/* Recipe Content */}
      <div
        className={`${
          hasSearch ? "mb-20" : ""
        } w-full  prose prose-neutral dark:prose-invert leading-snug tracking-tight max-w-none`}
      >
        {recipe.title && (
          <h1 className="text-3xl text-center font-bold mb-2">
            {recipe.title}
          </h1>
        )}

        <div className="flex justify-center gap-8 items-center">
          {recipe.cookingTime && (
            <>
              <h2 className="text-xl font-semibold mt-2 mb-2 opacity-60">
                Cooking Time: {recipe.cookingTime}
              </h2>
            </>
          )}

          {recipe.difficulty && (
            <>
              <h2 className="text-xl font-semibold mt-2 mb-2 opacity-60">
                Difficulty: {recipe.difficulty}
              </h2>
            </>
          )}
        </div>

        {recipe.ingredients.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients:</h2>
            <ul className="list-disc ml-4 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="mb-1">
                  {ingredient}
                </li>
              ))}
            </ul>
          </>
        )}

        {recipe.instructions.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-2">Instructions:</h2>
            <ol className="list-decimal ml-4 space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  value={parseInt(instruction.number)}
                  className="mb-2"
                >
                  {instruction.text}
                </li>
              ))}
            </ol>
          </>
        )}

        {recipe.notes.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-2">Notes:</h2>
            {recipe.notes.some((note) => note.type === "bullet") ? (
              <ul className="list-disc ml-4 space-y-2">
                {recipe.notes.map((note, index) =>
                  note.type === "bullet" ? (
                    <li key={index}>{note.content}</li>
                  ) : (
                    <p key={index} className="mb-2">
                      {note.content}
                    </p>
                  )
                )}
              </ul>
            ) : (
              recipe.notes.map((note, index) => (
                <p key={index} className="mb-2">
                  {note.content}
                </p>
              ))
            )}
          </>
        )}
      </div>

      <div className="mx-auto w-full">
        <h2 className="text-2xl text-center font-heading font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {recipe.notes.length > 0
            ? "Try another one!"
            : "What’s in your kitchen?"}
        </h2>

        <div className="flex items-center justify-between gap-2 mb-2">
          <Input
            type="text"
            value={ingredientInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter ingredients (e.g., chicken, tomatoes, cheese)"
            className="w-full"
          />
          <Button onClick={addIngredient} variant="secondary" className="">
            <Plus />
          </Button>
        </div>

        {ingredients?.length > 0 ? (
          <p className="text-sm opacity-70 my-2">Selected ingredients:</p>
        ) : (
          <p className="text-sm opacity-70">No ingredients added yet.</p>
        )}

        <div
          className={`flex ${
            ingredients?.length === 0 ? "" : "justify-between"
          } mb-4`}
        >
          <div className="flex flex-wrap gap-2">
            {ingredients?.map((ingredient, index) => (
              <Badge
                key={index}
                variant="secondary"
                className=" flex items-center gap-2 text-sm"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="text-red-800 hover:text-red-900"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </Badge>
            ))}
          </div>
          {ingredients?.length !== 0 && (
            <Button
              variant="link"
              className=""
              onClick={() => setIngredients([])}
            >
              Reset
            </Button>
          )}
        </div>

        <Button
          className="w-full font-logo text-lg font-bold tracking-widest"
          disabled={ingredients?.length === 0}
          onClick={handleSearch}
        >
          LET HIM COOK
        </Button>
      </div>
    </div>
  );
}

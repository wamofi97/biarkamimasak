import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Info, Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";
import LoadingSpinner from "./loading-spinner";
import ShiningText from "./shiningtext";
import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import parseRecipeText from "@/lib/parseRecipeText";
import RecipeCard from "./recipe-card";
import { Checkbox } from "./ui/checkbox";

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
  const { isSignedIn, user } = useUser();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
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
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [advanceOptions, setAdvanceOptions] = useState({
    servings: 1,
    cooking_time: 15,
    cuisine_preference: "",
    dietary_restrictions: [""],
  });

  const { servings, cooking_time, cuisine_preference, dietary_restrictions } =
    advanceOptions;

  const handleSearch = async () => {
    setLoading(true);
    setHasSearch(true);
    try {
      const response = await fetch(
        "https://biarkamimasak-api.fahmifauzi.my/v1/recipe/detailed/stream",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "X-Recipe-API-Key": import.meta.env.RECIPE_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients,
            ...advanceOptions,
          }),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "servings") {
      setAdvanceOptions({
        ...advanceOptions,
        [e.target.name]: parseInt(e.target.value),
      });
      return;
    }
    if (e.target.name === "dietary_restrictions") {
      setAdvanceOptions({
        ...advanceOptions,
        [e.target.name]: [e.target.value],
      });
      return;
    }

    setAdvanceOptions({
      ...advanceOptions,
      [e.target.name]: e.target.value,
    });
  };

  const handleCookingTimeChange = (value: string) => {
    const numericValue = Number(value);
    setAdvanceOptions({
      ...advanceOptions,
      ["cooking_time"]: numericValue,
    });
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

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [recipe]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col gap-y-4 ${
        hasSearch ? " md:h-[calc(100vh-235px)] h-[calc(100vh-265px)]" : " "
      }  overflow-y-auto  mx-auto my-4 p-3 bg-neutral-50 dark:bg-neutral-900/10 border rounded-lg shadow-md`}
    >
      <div className="mx-auto h-fit w-full bg-neutral-100 dark:bg-neutral-900 shadow-md border py-4 px-6 rounded-xl">
        <h2 className="text-2xl text-center font-heading font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {isSignedIn ? `Yow, ${user?.firstName}! ` : "Hi! "}
          {hasSearch ? "Try another one!" : "What’s in your kitchen?"}
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
        ) : null}

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
                <X
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => removeIngredient(ingredient)}
                />
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

        <div>
          <div className="flex items-center gap-x-2">
            <label
              htmlFor="advance"
              className={`${isSignedIn ? "" : "opacity-50"}`}
            >
              Advance options
            </label>
            <Checkbox
              checked={isAdvanced}
              id="advance"
              disabled={!isSignedIn}
              onCheckedChange={() => setIsAdvanced(!isAdvanced)}
            />
            {!isSignedIn && (
              <div className="group relative flex-grow">
                <Info className="w-5 h-5" />
                <div className="absolute -left-1/2 z-10 sm:-top-2 sm:left-7 w-0 sm:h-7 rounded-md bg-white sm:group-hover:w-80 group-hover:w-fit transition-[width] delay-200 duration-300 overflow-hidden text-sm text-neutral-700 shadow-md">
                  <p className="px-2 py-1">
                    Please sign in to use this feature.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className={`grid mb-2 ${
              isAdvanced ? "grid-rows-[1fr] mt-4 mb-5" : "grid-rows-[0fr]"
            } transition-[grid-template-rows, margin] duration-500`}
          >
            <div className="grid px-1 pb-1 gap-x-4 gap-y-1  grid-cols-1 sm:grid-cols-2 overflow-hidden">
              <div className="flex flex-col gap-1">
                <label>Servings</label>
                <Input
                  name="servings"
                  value={servings}
                  onChange={(e) => handleChange(e)}
                  type="number"
                  placeholder="e.g., 4"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Cooking time</label>
                <Select
                  onValueChange={handleCookingTimeChange}
                  value={cooking_time?.toString() || ""}
                >
                  <SelectTrigger id="cooking_time" name="cooking_time">
                    <SelectValue placeholder="Select cooking time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label>Cuisine preferences</label>
                <Input
                  name="cuisine_preference"
                  value={cuisine_preference}
                  onChange={(e) => handleChange(e)}
                  placeholder="e.g., Italian"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Dietary restrictions</label>
                <Input
                  name="dietary_restrictions"
                  value={dietary_restrictions}
                  onChange={(e) => handleChange(e)}
                  placeholder="e.g., gluten-free"
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full font-logo text-lg font-bold tracking-widest"
          disabled={ingredients?.length === 0}
          onClick={handleSearch}
        >
          LET HIM COOK
        </Button>
      </div>

      {recipe && <RecipeCard recipe={recipe} />}

      {!hasSearch ? null : loading ? (
        <div className="mt-4">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="flex flex-col mt-4 justify-center items-center">
          <h4 className=" text-center">
            We have let him cook, now we gonna{" "}
            <ShiningText
              text="let you cook ✨"
              className="inline-block"
              color="text-yellow-500 dark:text-yellow-300"
            />
          </h4>
        </section>
      )}
    </div>
  );
}

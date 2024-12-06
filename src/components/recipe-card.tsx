import React from "react";
import ShiningText from "./shiningtext";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: { number: string; text: string }[];
  cookingTime: string;
  difficulty: string;
  notes: { type: "text" | "bullet"; content: string }[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div
      className="
         w-full prose prose-neutral dark:prose-invert leading-snug tracking-tight max-w-none"
    >
      {recipe.title && (
        // <h1 className="md:text-3xl text-2xl text-center font-bold mb-2">
        //   {recipe.title}
        // </h1>
        <ShiningText
          text={recipe.title}
          className="md:text-3xl text-2xl text-center mx-auto mb-2 px-4 pb-1"
        />
      )}

      <div className="flex justify-center gap-8 items-center">
        {recipe.cookingTime && (
          <>
            <h2 className="text-xl font-semibold my-4 opacity-60">
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
  );
};

export default RecipeCard;

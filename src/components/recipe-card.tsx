import React from 'react';
import ShiningText from './shiningtext';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cooking_time: string;
  difficulty: string;
  notes: string;
  timestamp: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="py-6 flex flex-col">
      <h3 className="text-3xl font-bold text-center font-heading"><ShiningText text={`${recipe.title}`} ></ShiningText></h3>

      <div className='flex flex-wrap gap-x-12 justify-center'>
        <p className="opacity-80 mt-2">Cooking time: <span>{recipe.cooking_time}</span></p>
        <p className="opacity-80 mt-2">Difficulty: {recipe.difficulty}</p>
      </div>

      <div className='py-2'>
        <h2 className='font-bold text-xl font-heading'>Ingredients: </h2>
        {recipe?.ingredients?.map((ingredient,index) => <p key={index} className='pt-1 font-'>○ {ingredient}</p>)}

      </div>

      <div className='py-2'>
        <h2 className='font-bold text-xl font-heading'>Instructions: </h2>
        {recipe?.instructions?.map((instruction,index) => <p key={index} className='pt-1'>{index+1}. {instruction}</p>)}
      </div>

      <p className=" mt-4  italic">{recipe.notes}</p>
    </div>
  );
};

export default RecipeCard;

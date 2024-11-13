import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Delete, Dice1, Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import LoadingSpinner from './loading-spinner';
import ShiningText from './shiningtext';
import RecipeCard from './recipe-card';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cooking_time: string;
  difficulty: string;
  notes: string;
  timestamp: string;
}

export default function IngredientInputSection(){ 
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearch, setHasSearch] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    setHasSearch(true)
    try {
      const response = await fetch('https://biarkamimasak-api.fahmifauzi.my/v1/recipe/simple', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-Recipe-API-Key' : import.meta.env.VITE_RECIPE_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });
      const data = await response.json();
      setRecipe(data);
      
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
      setIngredientInput('');
    }
  };
  
  // Handle adding ingredients
  const addIngredient = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput)) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  // Handle input change
  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setIngredientInput(e.target.value);
  };

  // Handle key down (Enter to add ingredient)
  const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  // Handle ingredient removal
  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToRemove));
  };

  return (
    <div className={`w-full ${hasSearch ? 'flex' : ' max-w-2xl' } justify-center flex-wrap gap-x-8 gap-y-4 mx-auto my-4 sm:px-12 px-6 py-8 bg-neutral-50 dark:bg-neutral-900/10 border rounded-lg shadow-md`}>
      <div className='mx-auto   w-full'>
        <h2 className="text-2xl font-heading font-semibold mb-4 text-gray-800 dark:text-gray-100">
          What’s in your kitchen?
        </h2>

        <div className="flex items-center justify-between gap-2 mb-2">
          <Input
            type="text"
            value={ingredientInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter ingredients (e.g., chicken, tomatoes, cheese)"
            className='w-full'
          />
          <Button
            onClick={addIngredient}
            variant="secondary"
            className=""
          >
            <Plus/>
          </Button>
        </div>
        
        {ingredients?.length > 0 ? <p className='text-sm opacity-70 my-2'>Selected ingredients:</p> : <p className='text-sm opacity-70'>No ingredients added yet.</p>}
        
        <div className={`flex ${ingredients?.length === 0 ? '' : 'justify-between'} mb-4`}>
          
          <div className='flex flex-wrap gap-2'>
          {ingredients?.map((ingredient, index) => (
              <Badge
                key={index}
                variant="secondary"
                className=" flex items-center gap-2 text-sm"
              >
                {ingredient}
                <button onClick={() => removeIngredient(ingredient)} className="text-red-800 hover:text-red-900">
                  <Delete className='w-5 h-5'/>
                </button>
              </Badge>
          ))}
          </div>
          { ingredients?.length !== 0 && <Button variant='link' className='' onClick={() => setIngredients([])}>Reset</Button>}
        </div>

        <Button className="w-full font-logo text-lg font-bold tracking-widest" disabled={ingredients?.length === 0} onClick={handleSearch}>LET HIM COOK</Button>
      </div>
      
      <div className=''>
        {!hasSearch ? null : loading ? (
            <div className='flex justify-end'>
              <LoadingSpinner />
            </div>
            ) : (
              <section className="flex flex-col justify-center items-center">
                <h4 className="opacity-80 text-sm text-center">We have let him cook, now we gonna <ShiningText text="let you cook ✨" className='inline-block' color="text-yellow-500 dark:text-yellow-300"/></h4>
                <RecipeCard recipe={recipe} />
              </section>
              
            )}
      </div>
    </div>
  );
}


import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

interface SearchBarProps {
    ingredients: string;
    setIngredients: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
  }

const SearchBar: React.FC<SearchBarProps> = ({ ingredients, setIngredients, onSearch }) => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center gap-2">
      <Input
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (e.g., chicken, tomatoes, cheese)"
        className="w-96"
      />
      {!isSignedIn ? <Button variant="secondary"><Link
        to="/sign-in">Search</Link></Button> : 
      <Button  disabled={!ingredients} onClick={onSearch}>Search</Button>}
    </div>
  );
};

export default SearchBar;

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: { number: string; text: string }[];
  cookingTime: string;
  difficulty: string;
  notes: { type: "text" | "bullet"; content: string }[];
}

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

export default parseRecipeText;

import React, { useState, useEffect } from "react";

const DebouncedSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    // Fetch all recipes on component mount
    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => setAllRecipes(data.recipes))
      .catch((error) => console.error("Error fetching all recipes:", error));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setSelectedRecipe(null);
      return;
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      fetch(`https://dummyjson.com/recipes/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.recipes && data.recipes.length > 0) {
            setSuggestions(data.recipes);
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => console.error("Error fetching recipes:", error));
    }, 500);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelectSuggestion = (recipe) => {
    setSelectedRecipe(recipe);
    setQuery(recipe.name);
    setSuggestions([]);
  };

  return (
    <div className="container mt-10 px-5">
      <div className="text-center">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md mx-auto p-2 w-full border rounded-lg shadow"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="border max-w-md mx-auto rounded-lg mt-2 shadow bg-white">
          {suggestions.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleSelectSuggestion(recipe)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      )}

      {query && suggestions.length === 0 && (
        <p className="mt-2 text-center text-gray-500">No recipes found.</p>
      )}

      {selectedRecipe && (
        <div className="mt-4">
          <div className="border p-5">
            <h2 className="text-2xl font-bold mb-2">{selectedRecipe.name} :</h2>
            <div className="flex ">
              <img
                src={selectedRecipe.image}
                width="500px"
                className="mx-auto"
                alt=""
              />
              <div className="ps-10">
                <h1 className="text-center text-2xl font-bold mb-4 text-red-600">
                  Recipe :
                </h1>
                <h3 className="font-bold">Ingredients :</h3>
                <p>{selectedRecipe.ingredients}</p>

                <h3 className="font-bold mt-4">Instructions :</h3>
                <p>{selectedRecipe.instructions}</p>

                <h3 className="font-bold mt-4">Preparation Time :</h3>
                <p>{selectedRecipe.prepTimeMinutes} Minutes</p>

                <h3 className="font-bold mt-4">Cooking Time :</h3>
                <p>{selectedRecipe.cookTimeMinutes} Minutes</p>

                <h3 className="font-bold mt-4">Servings :</h3>
                <p>for {selectedRecipe.servings} members</p>

                <h3 className="font-bold mt-4">Meal Type :</h3>
                <p>{selectedRecipe.mealType}</p>
              </div>
            </div>

            {/* Add more recipe details as needed */}
          </div>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">All Recipes:</h2>
        {allRecipes.length > 0 ? (
          <div className="border grid grid-cols-3 gap-5 py-2 rounded-lg shadow bg-white w-full">
            {allRecipes.map((recipe) => (
              <div key={recipe.id} className="p-2 border shadow-md rounded-md">
                <p className="font-bold text-2xl my-2 text-center">
                  {recipe.name}
                </p>
                <img src={recipe.image} alt="" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading recipes...</p>
        )}
      </div>
    </div>
  );
};

export default DebouncedSearch;

// src/pages/Recipes.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import { Clock, Flame, Filter, Search, X } from "lucide-react";
import { mockRecipes } from "../data/mockRecipes";

const Recipes = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const { profile } = useSelector((state) => state.kitchen);

  // Local State for Search and Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const ingredientsInFridge = useSelector((state) => state.kitchen.ingredients);

  // Filtering Logic
  const filteredRecipes = mockRecipes
    .filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || recipe.diet === activeTab;

      // We only filter out recipes if the user is in a "Smart Mode" 
      // or simply use this for sorting instead of strict filtering.
      return matchesSearch && matchesTab;
    })
    .sort((a, b) => {
      // Check ingredients for both to determine sort order
      const aHas = ingredientsInFridge.some((ing) =>
        a.title.toLowerCase().includes(ing.name.toLowerCase())
      );
      const bHas = ingredientsInFridge.some((ing) =>
        b.title.toLowerCase().includes(ing.name.toLowerCase())
      );

      // Move recipes you can cook NOW to the top
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      return 0;
    });


  const categories = ["All", "Vegan", "Keto", "Vegetarian", "Gluten-Free"];

  return (
    <div
      className={`min-h-screen pt-24 px-6 pb-12 transition-colors ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Recipe Discovery</h1>
          <p className="text-slate-500">
            Tailored to your {profile.experience_level} skill level.
          </p>
        </header>

        {/* Search & Filter Section */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by dish name or diet..."
                className={`w-full pl-12 pr-10 py-4 rounded-2xl outline-none border transition-all ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 focus:border-emerald-500"
                    : "bg-white border-slate-200 focus:border-emerald-500 shadow-sm"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-500/50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === cat
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-200/50"
                      : "text-white hover:text-emerald-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            {filteredRecipes.length} Results Found
          </p>
          {profile.dietary_preferences.length > 0 && activeTab === "All" && (
            <span className="text-xs text-emerald-500 font-bold">
              ✨ Boosting your preferences:{" "}
              {profile.dietary_preferences.join(", ")}
            </span>
          )}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} isDark={isDarkMode} />
            ))
          ) : (
            <div className="col-span-full text-center py-24 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No recipes found</h3>
              <p className="text-slate-500">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("All");
                }}
                className="mt-6 text-emerald-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ... RecipeCard stays the same as previous version

// Sub-component for individual cards
const RecipeCard = ({ recipe, isDark }) => (
  <div
    className={`group rounded-3xl overflow-hidden border transition-all hover:shadow-2xl ${
      isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
    }`}
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-slate-800">
        {recipe.diet}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4 line-clamp-1">{recipe.title}</h3>
      <div className="flex items-center justify-between text-sm text-slate-500">
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-emerald-500" />
          <span>{recipe.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Flame size={16} className="text-orange-500" />
          <span>{recipe.calories} kcal</span>
        </div>
      </div>
      <button className="w-full mt-6 py-3 rounded-xl border-2 border-emerald-500 text-emerald-500 font-bold hover:bg-emerald-500 hover:text-white transition-all">
        View Recipe
      </button>
    </div>
  </div>
);

export default Recipes;

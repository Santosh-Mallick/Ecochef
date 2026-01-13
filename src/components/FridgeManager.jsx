// src/components/FridgeManager.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeIngredient } from '../../store/kitchenSlice.js';
import { Trash2 } from 'lucide-react';

export const FridgeManager = () => {
  const ingredients = useSelector((state) => state.kitchen.ingredients);
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();

  return (
    <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-md'}`}>
      <h2 className="text-xl font-bold mb-4">Your Virtual Fridge</h2>
      <ul className="space-y-3">
        {ingredients.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-slate-700 rounded-lg">
            <div>
              <p className="font-medium dark:text-emerald-400">{item.name}</p>
              <span className="text-xs text-slate-500">{item.category}</span>
            </div>
            <button 
              onClick={() => dispatch(removeIngredient(item.id))}
              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
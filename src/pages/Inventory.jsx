// src/pages/Inventory.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash2, Refrigerator, Tag, AlertCircle, ShoppingBasket } from 'lucide-react';
import { addIngredient, removeIngredient } from '../../store/kitchenSlice';

const Inventory = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const ingredients = useSelector((state) => state.kitchen.ingredients);
  
  // Local state for the "Add Item" form
  const [newItem, setNewItem] = useState({ name: '', category: 'Vegetables', qty: '1' });
  const [showForm, setShowForm] = useState(false);

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Proteins', 'Pantry', 'Others'];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    
    dispatch(addIngredient({
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      qty: newItem.qty,
      dateAdded: new Date().toLocaleDateString()
    }));
    
    setNewItem({ name: '', category: 'Vegetables', qty: '1' });
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen pt-24 px-6 pb-12 transition-colors ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Refrigerator className="text-emerald-500" size={36} />
              My Virtual Fridge
            </h1>
            <p className="text-slate-500 mt-2">Manage your ingredients to reduce waste and get AI recipes.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200/50"
          >
            <Plus size={20} /> {showForm ? 'Close' : 'Add Ingredient'}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Inventory List */}
          <div className="lg:col-span-2 space-y-4">
            {showForm && (
              <form onSubmit={handleAdd} className={`p-6 rounded-2xl border-2 border-dashed animate-in zoom-in duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Item Name (e.g. Avocado)"
                    className={`p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                  <select 
                    className={`p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button type="submit" className="bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                    Save to Fridge
                  </button>
                </div>
              </form>
            )}

            {ingredients.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {ingredients.map((item) => (
                  <div key={item.id} className={`group flex items-center justify-between p-4 rounded-2xl border transition-all hover:border-emerald-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
                        <ShoppingBasket size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Tag size={12} /> {item.category}</span>
                          <span>Added: {item.dateAdded}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => dispatch(removeIngredient(item.id))}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-slate-500">Your fridge is empty. Start adding ingredients!</p>
              </div>
            )}
          </div>

          {/* AI Side Panel */}
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-100'}`}>
              <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-600 mb-4">
                <AlertCircle size={20} /> AI Insights
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                Based on your <b>{ingredients.length}</b> ingredients, you could save 12% more on groceries this week by using your <b>{ingredients[0]?.name || 'stock'}</b> soon.
              </p>
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
                Generate Smart Recipes
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Inventory;
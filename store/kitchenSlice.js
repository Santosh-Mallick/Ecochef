// src/store/kitchenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState: {
    ingredients: [
      { id: 1, name: 'Organic Spinach', category: 'Vegetables' },
      { id: 2, name: 'Greek Yogurt', category: 'Dairy' }
    ],
    profile: {
      name: "Guest Cook",
      experience_level: "intermediate", 
      dietary_preferences: [], 
      allergies: [],
      health_goals: [], 
      explicit_preferences: {
        liked_cuisines: [],
        disliked_ingredients: []
      },
      interactions: [] 
    }
  },
  reducers: {
    // --- INGREDIENT ACTIONS (Needed for FridgeManager) ---
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    // --- PROFILE ACTIONS (Needed for Onboarding) ---
    updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        state.profile[parent][child] = value;
      } else {
        state.profile[field] = value;
      }
    },
    toggleArrayPreference: (state, action) => {
      const { field, value } = action.payload;
      const index = state.profile[field].indexOf(value);
      if (index === -1) {
        state.profile[field].push(value);
      } else {
        state.profile[field].splice(index, 1);
      }
    }
  }
});

// IMPORTANT: Every action used in your components MUST be exported here
export const { 
  addIngredient, 
  removeIngredient, 
  updateProfileField, 
  toggleArrayPreference 
} = kitchenSlice.actions;

export default kitchenSlice.reducer;
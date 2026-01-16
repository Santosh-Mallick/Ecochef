import { createSlice } from '@reduxjs/toolkit';

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState: {
    ingredients: [
      { id: 1, name: 'Organic Spinach', category: 'Vegetables', qty: 1, dateAdded: '1/10/2026' },
      { id: 2, name: 'Greek Yogurt', category: 'Dairy', qty: 1, dateAdded: '1/12/2026' }
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
    },
    auth: {
      token: localStorage.getItem('token') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      loading: false,
      user: null
    }
  },
  reducers: {
    addIngredient: (state, action) => {
      // payload: { id, name, category, qty, dateAdded }
      state.ingredients.unshift(action.payload); 
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    // --- PROFILE ACTIONS ---
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
    },

    // --- AUTH ACTIONS ---
    setLogin: (state, action) => {
      // state.auth.token = action.payload.token;
      state.auth.user = action.payload.user;
      state.auth.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.auth.token = null;
      state.auth.user = null;
      state.auth.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { 
  addIngredient, 
  removeIngredient, 
  updateProfileField, 
  toggleArrayPreference,
  setLogin,
  logout 
} = kitchenSlice.actions;

export default kitchenSlice.reducer;
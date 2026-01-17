import { createSlice } from '@reduxjs/toolkit';

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState: {
    ingredients: [
      { id: 1, name: 'Organic Spinach', category: 'Vegetables', qty: 1, dateAdded: '1/10/2026' },
      { id: 2, name: 'Greek Yogurt', category: 'Dairy', qty: 1, dateAdded: '1/12/2026' }
    ],
    profile: {
      name: "Chef",
      email: "",
      experience_level: "", 
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
      // Boolean check: Does the token exist?
      isAuthenticated: !!localStorage.getItem('token'),
      loading: false,
    }
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.unshift(action.payload); 
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
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
    setLogin: (state, action) => {
      const { token, user } = action.payload;

      if (user) {
        state.auth.isAuthenticated = true;
        state.auth.token = token || state.auth.token;
        state.profile.email = user.email;
        if (user.profile) {
          state.profile = { ...state.profile, ...user.profile };
        } else if (user.name) {
          state.profile.name = user.name;
        }
      }
    },
    initializeAuth: (state, action) => {
      const { token, user, isAuthenticated } = action.payload;
      state.auth.token = token;
      state.auth.isAuthenticated = isAuthenticated;
      if (user && isAuthenticated) {
        state.profile.email = user.email;
        state.profile.name = user.name || state.profile.name;
        if (user.profile) {
          state.profile = { ...state.profile, ...user.profile };
        }
      }
    },
    logout: (state) => {
      state.auth.token = null;
      state.auth.isAuthenticated = false;
      localStorage.removeItem('token');
      // Reset profile to default
      state.profile = {
        name: "Chef",
        email: "",
        experience_level: "", 
        dietary_preferences: [], 
        allergies: [],
        health_goals: [], 
        explicit_preferences: { liked_cuisines: [], disliked_ingredients: [] },
        interactions: []
      };
    }
  }
});

export const { 
  addIngredient, 
  removeIngredient, 
  updateProfileField, 
  toggleArrayPreference,
  setLogin,
  initializeAuth,
  logout 
} = kitchenSlice.actions;

export default kitchenSlice.reducer;
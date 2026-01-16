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
      // Changed to match your Token model's 'access_token' field
      token: localStorage.getItem('token') || null,
      isAuthenticated: !!localStorage.getItem('token'),
      loading: false,
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
      // Based on your Token model: action.payload.access_token
      // Based on your AuthResponse model: action.payload.user
      const { access_token, user } = action.payload;

      if (access_token) {
        state.auth.token = access_token;
        state.auth.isAuthenticated = true;
        localStorage.setItem('token', access_token);
      }

      if (user) {
        // user includes 'email' and 'profile' dict from your UserResponse model
        state.profile.email = user.email;
        
        // If the backend 'profile' dict contains your onboarding fields:
        if (user.profile) {
          state.profile = { 
            ...state.profile, 
            ...user.profile 
          };
        }
      }
    },
    logout: (state) => {
      state.auth.token = null;
      state.auth.isAuthenticated = false;
      localStorage.removeItem('token');
      // Reset profile to empty strings/arrays
      state.profile = kitchenSlice.getInitialState().profile;
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


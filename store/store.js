import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '@/store/features/PizzaSlice';
 // Ensure this path is correct

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer
  }
});

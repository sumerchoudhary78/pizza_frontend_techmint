import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '@/store/features/PizzaSlice';
 

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer
  }
});

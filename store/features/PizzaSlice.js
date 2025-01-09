// src/store/features/PizzaSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { STAGES } from '@/constants/Pizza';

const initialState = {
  orders: [],
  deliveredCount: 0,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        id: Date.now(),
        ...action.payload,
        stage: STAGES.PLACED,
        stageTime: 0,
        stageTimes: {
          [STAGES.PLACED]: 0,
          [STAGES.MAKING]: 0,
          [STAGES.READY]: 0,
          
        },
        totalTime: 0
      };
      state.orders.push(newOrder);
    },
    updateOrderStage: (state, action) => {
      const { orderId, newStage } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.stageTimes[order.stage] = order.stageTime;
        order.stage = newStage;
        order.stageTime = 0;
        if (newStage === STAGES.PICKED) {
          order.totalTime = Object.values(order.stageTimes).reduce((a, b) => a + b, 0);
          state.deliveredCount += 1;
        }
      }
    },
    cancelOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
    updateStageTime: (state) => {
      state.orders = state.orders.map(order => ({
        ...order,
        stageTime: order.stage !== STAGES.PICKED ? order.stageTime + 1 : order.stageTime
      }));
    }
  },
});

export const { placeOrder, updateOrderStage, cancelOrder, updateStageTime } = pizzaSlice.actions;
export default pizzaSlice.reducer;
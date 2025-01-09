// src/constants/pizza.js
export const STAGES = {
    PLACED: 'Placed',
    MAKING: 'Making',
    READY: 'Ready',
    PICKED: 'Picked'
  };
  
  export const STAGE_TIMES = {
    SMALL: 180,  // 5 minutes in seconds
    MEDIUM: 420, // 7 minutes in seconds
    LARGE: 600   // 10 minutes in seconds
  };
  
  export const MAX_ORDERS = 10;
  
  export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  export const getNextStage = (currentStage) => {
    const stages = Object.values(STAGES);
    const currentIndex = stages.indexOf(currentStage);
    return stages[currentIndex + 1];
  };
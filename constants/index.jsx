export const MAX_ORDERS = 10

export const STAGE_TIMES = {
  SMALL: 180,  // 3 minutes in seconds
  MEDIUM: 240, // 4 minutes in seconds
  LARGE: 300   // 5 minutes in seconds
}

export const STAGES = {
  PLACED: 'Order Placed',
  MAKING: 'Order in Making',
  READY: 'Order Ready',
  PICKED: 'Order Picked'
}

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins} min ${secs} sec`
}

export const getNextStage = (currentStage) => {
  switch (currentStage) {
    case STAGES.PLACED: return STAGES.MAKING;
    case STAGES.MAKING: return STAGES.READY;
    case STAGES.READY: return STAGES.PICKED;
    default: return null;
  }
}
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STAGES, STAGE_TIMES, formatTime } from '@/constants/Pizza';

const getTotalTime = (order) => {
  if (!order.stageTimes) return formatTime(order.stageTime);
  return formatTime(
    Object.values(order.stageTimes).reduce((a, b) => a + b, 0) + 
    (order.stage !== STAGES.PICKED ? order.stageTime : 0)
  );
};

const getStageTime = (order) => {
  if (order.stage === STAGES.PICKED) {
    return getTotalTime(order);
  }
  return formatTime(order.stageTime);
};

export const OrderCard = memo(({ order, stage, onNextStage, onCancel }) => {
  const isDelayed = order.stageTime > (
    order.size === 'Small' ? STAGE_TIMES.SMALL :
    order.size === 'Medium' ? STAGE_TIMES.MEDIUM : 
    STAGE_TIMES.LARGE
  );

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`
        ${isDelayed ? 'border-red-500' : 'border-gray-200'}
        transition-all duration-300
        backdrop-blur-sm bg-white/90
        hover:shadow-xl hover:shadow-primary/20
        relative overflow-hidden
      `}>
        {isDelayed && (
          <motion.div
            className="absolute inset-0 bg-red-500/10"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <motion.span
              className="font-semibold text-lg"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              #{order.id}
            </motion.span>
            {isDelayed && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="text-red-500 w-5 h-5" />
              </motion.div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">{order.type} • {order.size} • {order.base}</p>
            <div className="flex items-center text-gray-500 gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{getStageTime(order)}</span>
            </div>
            {stage !== STAGES.PLACED && (
              <div className="flex items-center text-gray-500 gap-2">
                <span className="text-sm">Total Time:</span>
                <span className="font-mono">{getTotalTime(order)}</span>
              </div>
            )}
          </div>
          <motion.div
            className="mt-4 space-y-2"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            {stage !== STAGES.PICKED && (
              <Button 
                variant="outline"
                className="w-full relative overflow-hidden group"
                onClick={() => onNextStage(order.id)}
              >
                <motion.span
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">
                  {stage === STAGES.READY ? 'Mark Picked' : 'Next Stage'}
                </span>
              </Button>
            )}
            {stage !== STAGES.READY && stage !== STAGES.PICKED && (
              <Button 
                variant="destructive"
                className="w-full"
                onClick={() => onCancel(order.id)}
              >
                Cancel
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
});
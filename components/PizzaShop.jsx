// src/components/PizzaShop/PizzaShop.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChefHat, Check, Pizza, Ban } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { STAGES, MAX_ORDERS, getNextStage } from '@/constants/Pizza';
import { PizzaLoader } from './PizzaLoader';
import { OrderCard } from './OrderCard';
import { OrderForm } from './OrderForm';

import { placeOrder } from '@/store/features/PizzaSlice';
import { updateOrderStage } from '@/store/features/PizzaSlice';
import { cancelOrder } from '@/store/features/PizzaSlice';

import PizzaBackground from './PizzaBackground';

const PizzaShop = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.pizza.orders);
  const deliveredCount = useSelector(state => state.pizza.deliveredCount);
  const activeOrdersCount = orders.filter(order => order.stage !== STAGES.PICKED).length;
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowLoader(false), 2000);
  }, []);

  const handleSubmit = (formData) => {
    if (activeOrdersCount >= MAX_ORDERS) {
      alert('Not taking any order for now');
      return;
    }
    dispatch(placeOrder(formData));
  };

  const handleNextStage = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const nextStage = getNextStage(order.stage);
      if (nextStage) {
        dispatch(updateOrderStage({ orderId, newStage: nextStage }));
      }
    }
  };

  const handleCancel = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const getStageIcon = useMemo(() => ({
    [STAGES.PLACED]: <ShoppingBag className="w-6 h-6 text-blue-600" />,
    [STAGES.MAKING]: <ChefHat className="w-6 h-6 text-orange-600" />,
    [STAGES.READY]: <Check className="w-6 h-6 text-green-600" />,
    [STAGES.PICKED]: <Pizza className="w-6 h-6 text-purple-600" />
  }), []);

  if (showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <PizzaLoader />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <PizzaBackground />
      </div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 font-sans"
    >
      {/* Enhanced Header */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="max-w-7xl mx-auto mb-8"
        
      >
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-4xl font-bold text-orange-900 flex items-center gap-4 font-serif"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Pizza Shop
            </motion.span>
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Pizza Paradise
            </span>
          </motion.h1>
          <motion.div
            className="bg-white/80 rounded-lg px-6 py-3 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-lg font-medium text-orange-900">Total Delivered Today: </span>
            <motion.span
              key={deliveredCount}
              initial={{ scale: 1.5, color: '#22c55e' }}
              animate={{ scale: 1, color: '#16a34a' }}
              className="text-2xl font-bold font-mono"
            >
              {deliveredCount}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <OrderForm onSubmit={handleSubmit} />
        
        <Card className="lg:col-span-2 backdrop-blur-sm bg-white/80 border-orange-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900 font-serif text-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <ChefHat className="w-6 h-6 text-orange-600" />
              </motion.div>
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {Object.values(STAGES).map(stage => (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 bg-orange-50/50 p-3 rounded-lg">
                      {getStageIcon[stage]}
                      <h3 className="font-semibold text-orange-900 font-serif">{stage}</h3>
                    </div>
                    <Separator className="bg-orange-200" />
                    <div className="space-y-4">
                      <AnimatePresence>
                        {orders
                          .filter(order => order.stage === stage)
                          .sort((a, b) => b.stageTime - a.stageTime)
                          .map(order => (
                            <OrderCard
                              key={order.id}
                              order={order}
                              stage={stage}
                              onNextStage={handleNextStage}
                              onCancel={handleCancel}
                            />
                          ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Limit Warning */}
      <AnimatePresence>
        {activeOrdersCount >= MAX_ORDERS && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 max-w-7xl mx-auto"
          >
            <Alert variant="destructive" className="bg-red-500 border-red-300">
              <Ban className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                Not taking any orders right now. Maximum order limit reached.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </div>
  );
};

export default PizzaShop;
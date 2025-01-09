// src/components/PizzaShop/OrderForm.jsx
import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Pizza, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const OrderForm = memo(({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'Veg',
    size: 'Small',
    base: 'Thin'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="lg:col-span-1 backdrop-blur-sm bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Pizza className="w-6 h-6" />
            </motion.div>
            Place New Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label className="text-base font-semibold">Pizza Type</Label>
                <RadioGroup
                  defaultValue={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  className="grid grid-cols-2 gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Veg" id="veg" />
                    <Label htmlFor="veg">Vegetarian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Non-Veg" id="non-veg" />
                    <Label htmlFor="non-veg">Non-Vegetarian</Label>
                  </div>
                </RadioGroup>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label className="text-base font-semibold">Size</Label>
                <RadioGroup
                  defaultValue={formData.size}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, size: value }))}
                  className="grid grid-cols-3 gap-4 mt-2"
                >
                  {['Small', 'Medium', 'Large'].map(size => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={size.toLowerCase()} />
                      <Label htmlFor={size.toLowerCase()}>{size}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label className="text-base font-semibold">Base</Label>
                <RadioGroup
                  defaultValue={formData.base}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, base: value }))}
                  className="grid grid-cols-2 gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Thin" id="thin" />
                    <Label htmlFor="thin">Thin Crust</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Thick" id="thick" />
                    <Label htmlFor="thick">Thick Crust</Label>
                  </div>
                </RadioGroup>
              </motion.div>
            </div>

            <Button 
              type="submit" 
              className="w-full relative overflow-hidden group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-6 h-6" />
                </motion.div>
              ) : (
                <>
                  <motion.span
                    className="absolute inset-0 bg-primary/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">Place Order</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
});
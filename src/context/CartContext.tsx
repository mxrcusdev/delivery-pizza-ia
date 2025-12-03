import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Pizza } from '@/types/pizzas';

interface CartContextType {
  items: CartItem[];
  addToCart: (pizza: Pizza, size: CartItem['size']) => void;
  removeFromCart: (pizzaId: string, size: CartItem['size']) => void;
  updateQuantity: (pizzaId: string, size: CartItem['size'], quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SIZE_MULTIPLIER = {
  pequena: 0.7,
  media: 1,
  grande: 1.4,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((pizza: Pizza, size: CartItem['size']) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.pizza.id === pizza.id && item.size === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.pizza.id === pizza.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { pizza, quantity: 1, size }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((pizzaId: string, size: CartItem['size']) => {
    setItems((prev) =>
      prev.filter((item) => !(item.pizza.id === pizzaId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (pizzaId: string, size: CartItem['size'], quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(pizzaId, size);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.pizza.id === pizzaId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) =>
      sum + item.pizza.price * SIZE_MULTIPLIER[item.size] * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

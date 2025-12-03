import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Pizza } from '@/types/pizzas';
import { useCart, } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/pizzas';

interface PizzaCardProps {
  pizza: Pizza;
  index: number;
}

const SIZE_OPTIONS: { value: CartItem['size']; label: string; multiplier: number }[] = [
  { value: 'pequena', label: 'P', multiplier: 0.7 },
  { value: 'media', label: 'M', multiplier: 1 },
  { value: 'grande', label: 'G', multiplier: 1.4 },
];

export function PizzaCard({ pizza, index }: PizzaCardProps) {
  const [selectedSize, setSelectedSize] = useState<CartItem['size']>('media');
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const currentMultiplier = SIZE_OPTIONS.find((s) => s.value === selectedSize)?.multiplier || 1;
  const currentPrice = pizza.price * currentMultiplier;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(pizza, selectedSize);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <article
      className="card-pizza group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category badge */}
        <span className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full capitalize">
          {pizza.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-card-foreground mb-2">
          {pizza.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {pizza.description}
        </p>

        {/* Ingredients */}
        <div className="flex flex-wrap gap-1 mb-4">
          {pizza.ingredients.slice(0, 3).map((ingredient) => (
            <span
              key={ingredient}
              className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
            >
              {ingredient}
            </span>
          ))}
          {pizza.ingredients.length > 3 && (
            <span className="px-2 py-0.5 text-muted-foreground text-xs">
              +{pizza.ingredients.length - 3}
            </span>
          )}
        </div>

        {/* Size selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Tamanho:</span>
          <div className="flex gap-1">
            {SIZE_OPTIONS.map((size) => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={`w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedSize === size.value
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price and add button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              R$ {currentPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            className={`btn-primary rounded-full px-6 ${isAdding ? 'scale-95' : ''}`}
          >
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}

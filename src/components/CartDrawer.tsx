import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/pizzas';

const SIZE_LABELS = {
  pequena: 'Pequena',
  media: 'Média',
  grande: 'Grande',
};

const SIZE_MULTIPLIER = {
  pequena: 0.7,
  media: 1,
  grande: 1.4,
};

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    onCheckout();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 shadow-elevated animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="font-display text-xl font-bold text-card-foreground">
              Seu Carrinho
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg mb-2">Seu carrinho está vazio</p>
              <p className="text-muted-foreground text-sm">
                Adicione pizzas deliciosas ao seu pedido!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={`${item.pizza.id}-${item.size}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-secondary/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-card-foreground">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-muted-foreground">Taxa de entrega</span>
              <span className="font-semibold text-accent">
                {totalPrice >= 50 ? 'Grátis' : 'R$ 8,00'}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6 pt-4 border-t border-border">
              <span className="text-lg font-bold text-card-foreground">Total</span>
              <span className="text-2xl font-bold text-primary">
                R$ {(totalPrice + (totalPrice >= 50 ? 0 : 8)).toFixed(2).replace('.', ',')}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full btn-primary py-6 text-lg font-semibold rounded-full"
            >
              Finalizar Pedido
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (pizzaId: string, size: CartItem['size'], quantity: number) => void;
  onRemove: (pizzaId: string, size: CartItem['size']) => void;
}) {
  const price = item.pizza.price * SIZE_MULTIPLIER[item.size] * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-background rounded-xl">
      <img
        src={item.pizza.image}
        alt={item.pizza.name}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-card-foreground">{item.pizza.name}</h4>
            <span className="text-sm text-muted-foreground">
              {SIZE_LABELS[item.size]}
            </span>
          </div>
          <button
            onClick={() => onRemove(item.pizza.id, item.size)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.pizza.id, item.size, item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold text-card-foreground">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.pizza.id, item.size, item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-bold text-primary">
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
}

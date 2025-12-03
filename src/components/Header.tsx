import { ShoppingCart, Pizza, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export function Header() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Pizza className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Pizzaria<span className="text-primary">Bella</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#menu" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Cardápio
          </a>
          <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Sobre Nós
          </a>
          <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+5511999999999"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>(11) 99999-9999</span>
          </a>

          <Button
            variant="outline"
            size="icon"
            className="relative border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold animate-scale-in">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

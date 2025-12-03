import { ArrowDown, Clock, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroPizza from '@/assets/hero-pizza.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPizza}
          alt="Pizza deliciosa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <div className="flex items-center gap-1 bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-cheese fill-cheese" />
              <span className="text-cheese text-sm font-medium">4.9</span>
            </div>
            <span className="text-crust text-sm">+500 avaliações</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            A Verdadeira
            <span className="text-primary block">Pizza Artesanal</span>
          </h1>

          <p className="text-crust text-lg md:text-xl mb-8 max-w-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Massa fermentada por 72 horas, ingredientes frescos selecionados e 
            assada em forno à lenha. Uma experiência gastronômica única.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-6 rounded-full font-semibold"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Cardápio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-full font-semibold border-crust/30 text-crust hover:bg-crust/10 hover:text-primary-foreground bg-transparent"
            >
              Fazer Pedido
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 text-crust">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm">Entrega em 30-45 min</span>
            </div>
            <div className="flex items-center gap-2 text-crust">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm">Entrega grátis acima de R$50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#menu" className="flex flex-col items-center gap-2 text-crust hover:text-primary transition-colors">
          <span className="text-sm">Explorar</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}

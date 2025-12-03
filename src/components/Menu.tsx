import { useState } from 'react';
import { pizzas } from '@/data/pizzas';
import { PizzaCard } from './PizzaCard';

const categories = [
  { id: 'todas', label: 'Todas' },
  { id: 'tradicional', label: 'Tradicionais' },
  { id: 'especial', label: 'Especiais' },
];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('todas');

  const filteredPizzas =
    activeCategory === 'todas'
      ? pizzas
      : pizzas.filter((pizza) => pizza.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Nosso Cardápio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Pizzas Artesanais
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada pizza é preparada com ingredientes frescos selecionados e 
            assada na hora em nosso forno à lenha.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Pizza grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPizzas.map((pizza, index) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

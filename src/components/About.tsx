import { Award, Clock, Flame, Heart } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'Forno à Lenha',
    description: 'Nossas pizzas são assadas em forno à lenha tradicional, garantindo o sabor autêntico italiano.',
  },
  {
    icon: Clock,
    title: '72h de Fermentação',
    description: 'Nossa massa descansa por 72 horas para uma textura leve e digestível.',
  },
  {
    icon: Heart,
    title: 'Ingredientes Frescos',
    description: 'Selecionamos diariamente os melhores ingredientes de produtores locais.',
  },
  {
    icon: Award,
    title: 'Premiada',
    description: 'Reconhecida como uma das melhores pizzarias da região por 3 anos consecutivos.',
  },
];

export function About() {
  return (
    <section id="sobre" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Nossa História
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Tradição e Paixão em Cada Fatia
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Desde 2010, a Pizzaria Bella traz o autêntico sabor da pizza italiana 
              para sua mesa. Nossa receita de família, passada por gerações, combina 
              técnicas tradicionais com ingredientes premium para criar experiências 
              gastronômicas inesquecíveis.
            </p>
            <p className="text-muted-foreground mb-8">
              Cada pizza é preparada com carinho, utilizando massa fermentada 
              naturalmente por 72 horas e assada em nosso forno à lenha importado 
              da Itália.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-primary">13+</span>
                <span className="text-muted-foreground text-sm">Anos de tradição</span>
              </div>
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-primary">50k+</span>
                <span className="text-muted-foreground text-sm">Pizzas vendidas</span>
              </div>
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-primary">4.9</span>
                <span className="text-muted-foreground text-sm">Avaliação média</span>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

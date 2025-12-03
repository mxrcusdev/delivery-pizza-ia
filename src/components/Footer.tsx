import { Pizza, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contato" className="bg-charcoal text-crust py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Pizza className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-primary-foreground">
                Pizzaria<span className="text-primary">Bella</span>
              </span>
            </a>
            <p className="text-crust/80 text-sm mb-6">
              A autêntica pizza italiana, feita com amor e tradição desde 2010.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-crust/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-crust/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="text-crust/80 hover:text-primary transition-colors">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-crust/80 hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-crust/80 hover:text-primary transition-colors">
                  Promoções
                </a>
              </li>
              <li>
                <a href="#" className="text-crust/80 hover:text-primary transition-colors">
                  Trabalhe Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-crust/80">(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-crust/80">
                  Rua das Pizzas, 123<br />
                  Centro - São Paulo, SP
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div className="text-crust/80">
                  <p>Terça a Domingo</p>
                  <p className="font-semibold text-primary-foreground">18h às 23h</p>
                </div>
              </li>
              <li className="text-crust/60 text-sm mt-4">
                Segunda-feira: Fechado
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-crust/20 pt-8 text-center">
          <p className="text-crust/60 text-sm">
            © 2024 Pizzaria Bella. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

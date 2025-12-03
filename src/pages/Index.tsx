import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Menu } from '@/components/Menu';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Checkout } from '@/components/Checkout';

function PizzaDeliveryApp() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
      </main>
      <Footer />
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
      {isCheckoutOpen && <Checkout onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
}

export default function Index() {
  return (
    <CartProvider>
      <PizzaDeliveryApp />
    </CartProvider>
  );
}

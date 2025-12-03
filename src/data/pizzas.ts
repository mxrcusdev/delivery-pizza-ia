import { Pizza } from '@/types/pizzas';

import pizzaMargherita from '@/assets/pizza-margherita.jpg';
import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import pizzaQuattroFormaggi from '@/assets/pizza-quattro-formaggi.jpg';
import pizzaVegetariana from '@/assets/pizza-vegetariana.jpg';
import pizzaPortuguesa from '@/assets/pizza-portuguesa.jpg';
import pizzaFrango from '@/assets/pizza-frango.jpg';

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'A clássica italiana com molho de tomate fresco, mussarela de búfala e manjericão.',
    price: 45.90,
    image: pizzaMargherita,
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela de búfala', 'Manjericão fresco', 'Azeite extra virgem'],
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Generosas fatias de pepperoni sobre queijo derretido e molho especial.',
    price: 52.90,
    image: pizzaPepperoni,
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Pepperoni importado', 'Orégano'],
  },
  {
    id: '3',
    name: 'Quattro Formaggi',
    description: 'Uma explosão de sabores com quatro queijos selecionados.',
    price: 58.90,
    image: pizzaQuattroFormaggi,
    category: 'especial',
    ingredients: ['Gorgonzola', 'Mussarela', 'Parmesão', 'Provolone', 'Cebolinha'],
  },
  {
    id: '4',
    name: 'Vegetariana',
    description: 'Frescor e sabor com os melhores vegetais da estação.',
    price: 48.90,
    image: pizzaVegetariana,
    category: 'tradicional',
    ingredients: ['Pimentões', 'Champignon', 'Azeitonas', 'Cebola', 'Tomate', 'Mussarela'],
  },
  {
    id: '5',
    name: 'Portuguesa',
    description: 'Um clássico brasileiro com ovos, presunto e muito sabor.',
    price: 54.90,
    image: pizzaPortuguesa,
    category: 'tradicional',
    ingredients: ['Ovos', 'Presunto', 'Cebola', 'Azeitonas', 'Mussarela', 'Orégano'],
  },
  {
    id: '6',
    name: 'Frango com Catupiry',
    description: 'Frango desfiado temperado com o cremoso catupiry.',
    price: 52.90,
    image: pizzaFrango,
    category: 'especial',
    ingredients: ['Frango desfiado', 'Catupiry', 'Mussarela', 'Milho', 'Orégano'],
  },
];

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'tradicional' | 'especial' | 'doce';
  ingredients: string[];
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
  size: 'pequena' | 'media' | 'grande';
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  complement: string;
  paymentMethod: 'dinheiro' | 'cartao' | 'pix';
  change?: number;
}

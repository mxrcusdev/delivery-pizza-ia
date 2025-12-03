import { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote, QrCode, CheckCircle, MapPin, User, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CustomerInfo } from '@/types/pizzas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const SIZE_MULTIPLIER = {
  pequena: 0.7,
  media: 1,
  grande: 1.4,
};

const SIZE_LABELS = {
  pequena: 'Pequena',
  media: 'Média',
  grande: 'Grande',
};

interface CheckoutProps {
  onClose: () => void;
}

export function Checkout({ onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    complement: '',
    paymentMethod: 'pix',
    change: undefined,
  });

  const deliveryFee = totalPrice >= 50 ? 0 : 8;
  const finalTotal = totalPrice + deliveryFee;

  const handleInputChange = (field: keyof CustomerInfo, value: string | number) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const validateInfo = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.neighborhood) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateInfo()) {
      setStep('payment');
    }
  };

  const handleFinish = () => {
    if (customerInfo.paymentMethod === 'dinheiro' && !customerInfo.change) {
      toast({
        title: 'Troco necessário',
        description: 'Por favor, informe o valor para troco.',
        variant: 'destructive',
      });
      return;
    }

    setStep('success');
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Pedido Confirmado!
          </h2>
          <p className="text-muted-foreground mb-2">
            Seu pedido foi recebido com sucesso.
          </p>
          <p className="text-muted-foreground mb-8">
            Tempo estimado de entrega: <strong className="text-primary">30-45 minutos</strong>
          </p>
          <div className="bg-card p-6 rounded-xl mb-8 text-left">
            <h3 className="font-semibold text-card-foreground mb-4">Detalhes do Pedido</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Nome:</span> {customerInfo.name}</p>
              <p><span className="text-muted-foreground">Telefone:</span> {customerInfo.phone}</p>
              <p><span className="text-muted-foreground">Endereço:</span> {customerInfo.address}, {customerInfo.neighborhood}</p>
              <p><span className="text-muted-foreground">Total:</span> <span className="text-primary font-bold">R$ {finalTotal.toFixed(2).replace('.', ',')}</span></p>
            </div>
          </div>
          <Button onClick={onClose} className="btn-primary rounded-full px-8 py-6 text-lg">
            Voltar ao Cardápio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={step === 'info' ? onClose : () => setStep('info')}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {step === 'info' ? 'Dados de Entrega' : 'Pagamento'}
            </h1>
            <p className="text-muted-foreground text-sm">
              Passo {step === 'info' ? '1' : '2'} de 2
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'info' ? (
              <div className="space-y-6">
                {/* Personal Info */}
                <div className="bg-card p-6 rounded-xl shadow-card">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-card-foreground">Informações Pessoais</h2>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Seu nome"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-card p-6 rounded-xl shadow-card">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-card-foreground">Endereço de Entrega</h2>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Rua, número"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={customerInfo.neighborhood}
                          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                          placeholder="Seu bairro"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={customerInfo.complement}
                          onChange={(e) => handleInputChange('complement', e.target.value)}
                          placeholder="Apto, bloco..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleContinue} className="w-full btn-primary py-6 text-lg rounded-full">
                  Continuar para Pagamento
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-card p-6 rounded-xl shadow-card">
                  <h2 className="font-semibold text-card-foreground mb-6">Forma de Pagamento</h2>
                  <div className="grid gap-3">
                    {[
                      { id: 'pix', label: 'PIX', icon: QrCode, desc: 'Pagamento instantâneo' },
                      { id: 'cartao', label: 'Cartão', icon: CreditCard, desc: 'Débito ou crédito na entrega' },
                      { id: 'dinheiro', label: 'Dinheiro', icon: Banknote, desc: 'Pagamento em espécie' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handleInputChange('paymentMethod', method.id as CustomerInfo['paymentMethod'])}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                          customerInfo.paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          customerInfo.paymentMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}>
                          <method.icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-card-foreground">{method.label}</p>
                          <p className="text-sm text-muted-foreground">{method.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {customerInfo.paymentMethod === 'dinheiro' && (
                    <div className="mt-4">
                      <Label htmlFor="change">Troco para quanto?</Label>
                      <Input
                        id="change"
                        type="number"
                        value={customerInfo.change || ''}
                        onChange={(e) => handleInputChange('change', Number(e.target.value))}
                        placeholder="R$ 100,00"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>

                <Button onClick={handleFinish} className="w-full btn-primary py-6 text-lg rounded-full">
                  Confirmar Pedido
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl shadow-card sticky top-6">
              <h2 className="font-semibold text-card-foreground mb-4">Resumo do Pedido</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={`${item.pizza.id}-${item.size}`} className="flex items-center gap-3">
                    <img
                      src={item.pizza.image}
                      alt={item.pizza.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground text-sm">{item.pizza.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {SIZE_LABELS[item.size]} x{item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-card-foreground text-sm">
                      R$ {(item.pizza.price * SIZE_MULTIPLIER[item.size] * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-card-foreground">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Entrega</span>
                  <span className={deliveryFee === 0 ? 'text-accent font-semibold' : 'text-card-foreground'}>
                    {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span className="text-card-foreground">Total</span>
                  <span className="text-primary">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

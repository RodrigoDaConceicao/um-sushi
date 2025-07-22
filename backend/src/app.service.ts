import { Injectable } from '@nestjs/common';
import { MenuItemDto } from './menu-item.dto';

@Injectable()
export class AppService {
  private menu: MenuItemDto[] = [
    {
      id: 1,
      nome: 'Sushi Tradicional',
      preco: 20.5,
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-YPG7Z-r0aW53ErFeePTwzynWBRzrKPimA&s',
    },
    {
      id: 2,
      nome: 'Sashimi',
      preco: 21.0,
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-YPG7Z-r0aW53ErFeePTwzynWBRzrKPimA&s',
    },
    {
      id: 3,
      nome: 'Combinado',
      preco: 65.0,
      imagem:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-YPG7Z-r0aW53ErFeePTwzynWBRzrKPimA&s',
    },
  ];
  private globalOrderId = 1;
  private orders: any[] = [];

  getMenu(): MenuItemDto[] {
    return this.menu;
  }

  createOrder(cartItems: CartItemDto[]) {
    const items: any = [];

    cartItems.forEach((cartItem) => {
      const product = this.menu.find((p) => p.id === cartItem.produtoId);
      if (!product) return;

      items.push({
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        count: cartItem.quantidade,
        total: +(product.preco * cartItem.quantidade),
      });
    });

    const total = items.reduce((acc, item) => acc + item.total, 0);

    const order = {
      id: this.globalOrderId++,
      items,
      total,
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }
}

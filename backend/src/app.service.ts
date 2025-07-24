import { Injectable } from '@nestjs/common';
import { MenuItemDto } from './menu-item.dto';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  private menu = JSON.parse(
    readFileSync(join(__dirname, '..', 'cardapio-temp.json'), 'utf8'),
  );
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

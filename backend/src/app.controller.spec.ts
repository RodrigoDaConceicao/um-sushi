import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('Teste de listagem do menu e criação do pedido', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  it('getMenu deve retornar o menu', () => {
    const menu = appController.getMenu();
    expect(Array.isArray(menu)).toBe(true);
    expect(menu.length).toBeGreaterThan(0);
    expect(menu[0]).toHaveProperty('id');
    expect(menu[0]).toHaveProperty('nome');
  });

  it('createOrder deve criar um pedido válido', () => {
    const payload = [
      { produtoId: 1, quantidade: 2 },
      { produtoId: 2, quantidade: 1 },
      { produtoId: 99, quantidade: 5}
    ];

    const order = appController.createOrder(payload);

    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('items');
    expect(Array.isArray(order.items)).toBe(true);
    expect(order.items.length).toBeGreaterThan(0);
    expect(order.items[0]).toHaveProperty('id');
    expect(order.items[0]).toHaveProperty('nome');
    expect(order).toHaveProperty('total');
    expect(order).toHaveProperty('createdAt');
  });
});

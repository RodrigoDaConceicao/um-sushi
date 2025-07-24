import { validate } from 'class-validator';
import { MenuItemDto } from '../src/menu-item.dto';

describe('MenuItemDto', () => {
  it('should validate a valid menu item', async () => {
    // Arrange
    const dto = new MenuItemDto();
    dto.id = 1;
    dto.nome = 'Sushi Box Clássico';
    dto.descricao = 'Uma seleção dos sushis mais populares: salmão, atum, pepino e kani.';
    dto.preco = 25.5;
    dto.imagem = 'url_da_imagem_sushi_box_classico.jpg';
    dto.categoria = ['sushi'];
    dto.ingredientes = ['Salmão', 'Atum', 'Pepino', 'Kani', 'Arroz', 'Alga Nori'];

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });

  it('should fail validation for missing required fields', async () => {
    // Arrange
    const dto = new MenuItemDto();

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    const fields = errors.map(e => e.property);
    expect(fields).toEqual(
      expect.arrayContaining([
        'id', 'nome', 'descricao', 'preco', 'imagem', 'categoria', 'ingredientes'
      ])
    );
  });
}); 
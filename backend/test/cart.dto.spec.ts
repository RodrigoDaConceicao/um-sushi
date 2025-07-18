import { validate } from 'class-validator';
import { CartDto } from '../src/cart.dto';

describe('CartDto', () => {
  it('should validate a valid cart', async () => {
    // Arrange
    const dto = new CartDto();
    dto.items = [
      { produtoId: 1, quantidade: 2 },
      { produtoId: 17, quantidade: 1 }
    ];

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });

  it('should fail validation for invalid cart (missing fields)', async () => {
    // Arrange
    const dto = new CartDto();
    dto.items = [{} as any];

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('items');
  });

  it('should fail validation for invalid quantity', async () => {
    // Arrange
    const dto = new CartDto();
    dto.items = [{ produtoId: 1, quantidade: 0 }];

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain('quantidade');
  });
}); 
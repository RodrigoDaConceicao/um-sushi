import { IsArray, IsNumber, IsString } from 'class-validator';

export class MenuItemDto {
  @IsNumber()
  id: number;

  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsString()
  imagem: string;

  @IsArray()
  @IsString({ each: true })
  categoria: string[];

  @IsArray()
  @IsString({ each: true })
  ingredientes: string[];
} 
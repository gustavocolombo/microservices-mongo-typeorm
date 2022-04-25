import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUpdateProductsDTO } from '../dtos/IUpdateProductsDTO';
import { Products } from '../models/Products';

@Injectable()
export class UpdateProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsService: Repository<Products>,
  ) {}

  async execute(updateProducts: IUpdateProductsDTO) {
    const updated = true;

    const findProduct = await this.productsService.findOne({
      where: { id: updateProducts.id },
    });

    if (!findProduct) throw new Error('Produto não existente');

    const updateProduct = await this.productsService.update(
      findProduct.id,
      updateProducts,
    );

    return updated ? 'objeto alterado' : false;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { Products } from '../models/Products';

@Injectable()
export class CreateProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsService: Repository<Products>,
  ) {}

  async execute(createProduct: ICreateProductDTO) {
    const product = await this.productsService.create(createProduct);

    await this.productsService.save(product);

    return product;
  }
}

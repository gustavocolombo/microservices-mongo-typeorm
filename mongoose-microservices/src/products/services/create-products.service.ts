import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateProductsDTO } from '../dtos/ICreateProductsDTO';
import { Products } from '../models/Product';

@Injectable()
export class CreateProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productsService: Model<Products>,
  ) {}

  async execute(createProduct: ICreateProductsDTO) {
    const products = await this.productsService.create(createProduct);

    return products;
  }
}

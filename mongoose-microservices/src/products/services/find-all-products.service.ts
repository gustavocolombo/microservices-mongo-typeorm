import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from '../models/Product';
import { Model } from 'mongoose';

@Injectable()
export class FindAllProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productsService: Model<Products>,
  ) {}

  async execute() {
    const isPopulated = [];

    return isPopulated ? await this.productsService.find() : [];
  }
}

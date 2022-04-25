import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../models/Products';

@Injectable()
export class FindAllProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsService: Repository<Products>,
  ) {}

  async execute() {
    const isPopulated = [];

    return isPopulated ? await this.productsService.find() : [];
  }
}

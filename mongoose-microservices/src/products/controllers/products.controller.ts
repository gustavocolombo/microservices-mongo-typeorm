import { Body, Controller, Get, Post } from '@nestjs/common';
import { ICreateProductsDTO } from '../dtos/ICreateProductsDTO';
import { CreateProductsService } from '../services/create-products.service';
import { FindAllProductsService } from '../services/find-all-products.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    private createProductService: CreateProductsService,
    private findAllProductsService: FindAllProductsService,
  ) {}

  @Post('/create')
  async createProduct(@Body() createProduct: ICreateProductsDTO) {
    return await this.createProductService.execute(createProduct);
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log('hello rabbit');
  }

  @EventPattern('product_created')
  async createWithMicro(product: any) {
    console.log('caindo aqui');

    const result = await this.createProductService.execute(product);

    console.log('result', result);
  }

  @Get('/find')
  async findAllProducts() {
    return await this.findAllProductsService.execute();
  }
}

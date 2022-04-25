import { Body, Controller, Get, Inject, Post, Put } from '@nestjs/common';
import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IUpdateProductsDTO } from '../dtos/IUpdateProductsDTO';
import { CreateProductsService } from '../services/create-products.service';
import { FindAllProductsService } from '../services/find-all-products.service';
import { UpdateProductsService } from '../services/update-products.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    private createProductService: CreateProductsService,
    private findAllProductsService: FindAllProductsService,
    private updateProductsService: UpdateProductsService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('/create')
  async createUser(@Body() createProducts: ICreateProductDTO) {
    const product = await this.createProductService.execute(createProducts);
    this.client.emit('product_created', product);
    console.log('o cliente foi chamado')
    return product;
  }

  @Get('/find-all')
  async findAllProducts() {
    this.client.emit('hello', 'hello from rabbitmq');
    return await this.findAllProductsService.execute();
  }

  @Put('/update')
  async updateProducts(@Body() updateProduct: IUpdateProductsDTO) {
    return await this.updateProductsService.execute(updateProduct);
  }
}

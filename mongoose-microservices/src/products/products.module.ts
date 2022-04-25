import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './models/Product';
import { ProductsController } from './controllers/products.controller';
import { CreateProductsService } from './services/create-products.service';
import { FindAllProductsService } from './services/find-all-products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [CreateProductsService, FindAllProductsService],
})
export class ProductsModule {}

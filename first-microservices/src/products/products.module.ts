import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { CreateProductsService } from './services/create-products.service';
import { Products } from './models/Products';
import { FindAllProductsService } from './services/find-all-products.service';
import { UpdateProductsService } from './services/update-products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://nqojaoun:fitIlczp02QUtTMIVGLtj1WVJPh05MgG@jackal.rmq.cloudamqp.com/nqojaoun',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    CreateProductsService,
    FindAllProductsService,
    UpdateProductsService,
  ],
})
export class ProductsModule {}

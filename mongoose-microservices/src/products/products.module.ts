import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './models/Product';
import { ProductsController } from './controllers/products.controller';
import { CreateProductsService } from './services/create-products.service';
import { FindAllProductsService } from './services/find-all-products.service';
import { SendMailConsumerService } from './jobs/sendmail-consumer.service';
import { SendMailProviderService } from './jobs/sendmail-provider.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
    ]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sendmail-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'vernice.considine40@ethereal.email',
          pass: 'CnGjkmstB6Xgdd3bhQ',
        },
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [
    CreateProductsService,
    FindAllProductsService,
    SendMailConsumerService,
    SendMailProviderService,
  ],
})
export class ProductsModule {}

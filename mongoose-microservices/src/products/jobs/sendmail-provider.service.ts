import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ICreateProductsDTO } from '../dtos/ICreateProductsDTO';

@Injectable()
export class SendMailProviderService {
  constructor(@InjectQueue('sendmail-queue') private queue: Queue) {}

  async execute(product: ICreateProductsDTO) {
    console.log('oque esta passando', product);
    
    this.queue.add('sendmail-job', product);
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ICreateProductsDTO } from '../dtos/ICreateProductsDTO';

@Processor('sendmail-queue')
export class SendMailConsumerService {
  constructor(private mailerService: MailerService) {}

  @Process('sendmail-job')
  async sendMailJob(job: Job<ICreateProductsDTO>) {
    const { data } = job;

    console.log('caiu aqui');

    await this.mailerService.sendMail({
      to: process.env.MAIL_USER,
      text: `Enjoy the party and have a fun! + ${data.name}`,
      subject: 'Welcome to my world!',
      from: 'gustacolombo@gmail.com',
    });
  }
}

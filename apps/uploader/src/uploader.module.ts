import { Module } from '@nestjs/common';
import { UploaderProxyService } from './services/uploader-proxy.service';
import { ConfigModule } from '@nestjs/config';
import { S3Uploader } from './upload-services/s3-uploader';
import { UploaderController } from './controllers/uploader.controller';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true })],
	controllers: [UploaderController],
	providers: [UploaderProxyService, S3Uploader],
})
export class UploaderModule {}

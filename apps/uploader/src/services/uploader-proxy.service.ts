import { Injectable } from '@nestjs/common';
import { ObjectUploader } from '@cloudflicks/interfaces';
import { S3Uploader } from '../upload-services/s3-uploader';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploaderProxyService implements ObjectUploader {
	constructor(private readonly s3Uploader: S3Uploader, private configService: ConfigService) {}

	async upload(file: any): Promise<string> {
		const params = {
			Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
			Key: file.originalname,
			Body: file.buffer,
			ACL: 'public-read',
			ContentType: 'video/mp4',
			ServerSideEncryption: 'AES256',
		};
		return this.s3Uploader.upload(params);
	}
}

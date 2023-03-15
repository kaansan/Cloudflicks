import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ObjectUploader } from '@cloudflicks/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Uploader implements ObjectUploader {
	private client: S3Client;

	constructor(private configService: ConfigService) {
		this.client = new S3Client({
			region: this.configService.get('AWS_REGION'),
			credentials: {
				accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
				secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
			},
		});
	}

	async upload(params): Promise<string> {
		try {
			const command = new PutObjectCommand(params);
			const response = await this.client.send(command);
			console.log('Object uploaded successfully:', response);
			return `https://d1befrd4a0sbi2.cloudfront.net/${params.Key}`;
		} catch (error) {
			console.error('Error uploading object:', error);
		}
	}
}

import {
	UploadedFile,
	Post,
	Controller,
	UseInterceptors,
	ParseFilePipe,
	FileTypeValidator,
} from '@nestjs/common';
import { UploaderProxyService } from '../services/uploader-proxy.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller()
export class UploaderController {
	constructor(private uploaderProxyService: UploaderProxyService) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async upload(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new FileTypeValidator({ fileType: 'mp4' })],
			})
		)
		file: any
	) {
		const uploadedFileUrl = await this.uploaderProxyService.upload(file);
		return {
			uploadedFileUrl,
		};
	}
}

export interface ObjectUploader {
	upload(videoFile: string, s3Bucket: string): Promise<string>;
}

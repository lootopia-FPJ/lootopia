// src/common/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import toStream from 'buffer-to-stream'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async uploadImage(file: Express.Multer['File']): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'profile-image-lootopia' },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'))
          return resolve(result)
        }
      )

      toStream(file.buffer).pipe(upload)
    })
  }
}

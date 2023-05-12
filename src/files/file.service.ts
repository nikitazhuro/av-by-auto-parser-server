import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class FileService {
  async downloadImage(url: string, imagePath: string) {
    return axios({
      url,
      responseType: 'stream',
    }).then(
      (response) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(imagePath))
            .on('finish', resolve)
            .on('error', (e) => reject(e));
        }),
    );
  }
  async fetchPhotosFromAv({ brandName, modelName, genName, year, photosUrls }) {
    const resultImageUUIDs = [];
    for (let i = 0; i < photosUrls.length; i++) {
      try {
        const uuid = v4();
        const pathCustom =
          'static/' +
          `${brandName ? `${brandName}/` : ''}` +
          `${modelName ? `${modelName}/` : ''}` +
          `${genName ? `${genName}/` : ''}` +
          `${year ? `${year}/` : ''}`;

        const filePath = path.resolve(__dirname, '..', '..', pathCustom);

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        await this.downloadImage(photosUrls[i], filePath + `/${uuid}.jpg`);

        resultImageUUIDs.push(uuid);
      } catch (error) {
        // throw new HttpException('File error', HttpStatus.BAD_REQUEST);
      }
    }

    return resultImageUUIDs;
  }
}

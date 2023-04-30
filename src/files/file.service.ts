import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async fetchPhotosFromAv(photos: Array<string>) {
    const resultImageUUIDs = [];
    for (let i = 0; i < photos.length; i++) {
      try {
        const uuid = v4();
        const path = `static/${uuid}.jpg`;
        await this.downloadImage(photos[i], path);

        resultImageUUIDs.push(uuid);
      } catch (error) {
        // throw new HttpException('File error', HttpStatus.BAD_REQUEST);
      }
    }

    return resultImageUUIDs;
  }

  async createFile(fileData: any): Promise<string> {
    try {
      const fileName = `${v4()}.jpg`;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), fileData.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException('File error', HttpStatus.BAD_REQUEST);
    }
  }
}

import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { Pad } from './entities/pad.entity';

@Injectable()
export class PadsService {
  findOrCreate(fileName: string) {
    const defaultContent: Pad = {
      content: '',
      author: null,
      lastIp: null,
      updatedAt: new Date(),
    };

    const filePath = path.resolve(
      __dirname,
      '../../',
      'public',
      'pads',
      `${fileName}.json`,
    );

    if (fs.existsSync(filePath))
    {
      const file = JSON.parse(
        fs.readFileSync(
          path.resolve(
            __dirname,
            '../../',
            'public',
            'pads',
            `${fileName}.json`,
          ),
          'utf8',
        ),
      );

      return file;
    }

    try
    {
      fs.writeFileSync(
        path.resolve(__dirname, '../../', 'public', 'pads', `${fileName}.json`),
        JSON.stringify(defaultContent),
      );
    } catch (err)
    {
      throw err;
    }

    return defaultContent;
  }

  create(fileName: string, createPadDto: any) {
    fs.writeFileSync(
      path.resolve(__dirname, '../../', 'public', 'pads', `${fileName}.json`),
      JSON.stringify(createPadDto),
    );

    return createPadDto;
  }
}

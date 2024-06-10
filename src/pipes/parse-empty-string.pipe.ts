import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseEmptyStringPipe implements PipeTransform<any> {
  constructor() {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value === '') {
      throw new HttpException(
        `Empty value for ${metadata.type} parameter ${metadata.data}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}

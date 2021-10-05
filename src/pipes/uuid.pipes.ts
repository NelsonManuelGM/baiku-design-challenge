import { PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import validator from 'validator';

export class UuidPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
      if (!validator.isUUID(value)) {
        throw new HttpException("Invalid Id", HttpStatus.BAD_REQUEST);
      }
      return value;
    }
  }
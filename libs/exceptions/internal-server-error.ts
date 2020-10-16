import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerError extends HttpException {
  constructor(stackTrace: any) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        stackTrace: stackTrace,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

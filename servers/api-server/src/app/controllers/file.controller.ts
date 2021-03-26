import { Context, dependency, Get, HttpResponse } from '@foal/core';
import { Disk } from '@foal/storage';

export class FileController {

  @dependency
  disk!: Disk;

  @Get('/:fileName')
  async getOne(ctx: Context): Promise<HttpResponse> {
    let { fileName } = ctx.request.params;
    fileName = decodeURI(fileName);

    return this.disk.createHttpResponse(fileName);
  }
}

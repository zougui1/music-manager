import { Context, dependency, Get, HttpResponse, HttpResponseOK, Log, ApiResponse } from '@foal/core';
import { User } from 'user-pkg';

@Log('UseController', { body: true, params: true, query: true })
export class UserController {

  @dependency
  user!: User;

  @Get('/')
  @ApiResponse(200, {
    description: 'List of users',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
          }
        }
      }
    }
  })
  async find(ctx: Context): Promise<HttpResponse> {
    const users = await this.user.findMany();
    return new HttpResponseOK(users);
  }
}

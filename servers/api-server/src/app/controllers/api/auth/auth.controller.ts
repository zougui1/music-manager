import { Context, dependency, Post, Options, HttpResponse, HttpResponseOK, Log } from '@foal/core';
import { User } from 'user-pkg';

import { generateToken } from '../../../utils';

@Log('AuthController', { body: true, params: true, query: true })
export class AuthController {

  @dependency
  user!: User;

  @Post('/login')
  async login(ctx: Context, params: Record<string, unknown>, { email, password }: { email: string, password: string }): Promise<HttpResponse> {
    const user = await this.user.login(email, password);
    const token = generateToken(user);

    return new HttpResponseOK({ user, token });
  }

  @Options('/login')
  async loginOptions(): Promise<HttpResponse> { return new HttpResponseOK(); }
}

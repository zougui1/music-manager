import { Context, HttpResponse } from '@foal/core';
import { User } from 'user-pkg';
export declare class AuthController {
    user: User;
    login(ctx: Context, params: Record<string, unknown>, { email, password }: {
        email: string;
        password: string;
    }): Promise<HttpResponse>;
    loginOptions(): Promise<HttpResponse>;
}
//# sourceMappingURL=auth.controller.d.ts.map
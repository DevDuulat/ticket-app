import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(input: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
        userId: number;
        username: string;
    }>;
    getUserInfo(request: any): any;
}

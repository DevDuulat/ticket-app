import { AuthService } from './auth.service';
export declare class PassportAuthController {
    private authService;
    constructor(authService: AuthService);
    login(request: any): Promise<{
        accessToken: string;
        userId: number;
        username: string;
    }>;
    getUserInfo(request: any): any;
}

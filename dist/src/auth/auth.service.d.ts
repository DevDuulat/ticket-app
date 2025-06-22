import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
type AuthInput = {
    username: string;
    password: string;
};
type SignInData = {
    userId: number;
    username: string;
};
type AuthResult = {
    accessToken: string;
    userId: number;
    username: string;
};
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    authenticate(input: AuthInput): Promise<AuthResult>;
    validateUser(input: {
        username: string;
        password: string;
    }): Promise<SignInData | null>;
    signIn(user: SignInData): Promise<AuthResult>;
}
export {};

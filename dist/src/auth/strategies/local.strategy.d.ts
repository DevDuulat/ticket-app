import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any) => InstanceType<any> & {
    validate(...args: any[]): unknown | Promise<unknown>;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<any>;
}
export {};

import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: [opt: any] | [opt: any]) => InstanceType<typeof Strategy> & {
    validate(...args: any[]): unknown | Promise<unknown>;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        sub: string;
        username: string;
    }): unknown;
}
export {};

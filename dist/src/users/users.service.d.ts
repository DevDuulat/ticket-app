export type User = {
    userId: number;
    username: string;
    password: string;
};
export declare class UsersService {
    findUserByName(username: string): Promise<User | undefined>;
}

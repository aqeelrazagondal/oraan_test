import { IsDefined, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class UserLogin {
    @IsString()
    @IsDefined()
    userName: string;

    @IsString()
    @IsDefined()
    password: string;
}

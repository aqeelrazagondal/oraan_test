import { IsDefined, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class UserLogin {
    @IsString()
    @IsDefined()
    user_name: string;

    @IsString()
    @IsDefined()
    password: string;
}

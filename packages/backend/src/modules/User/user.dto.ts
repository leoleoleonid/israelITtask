import {User} from "./user.entity";
import {IsString, MaxLength, MinLength, IsNumber, IsOptional,} from 'class-validator';

export class UserDTO implements User {
    @IsNumber()
    id: number

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    firstName: string

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    lastName: string
}


export class CreateUserDto extends UserDTO {
    @IsOptional()
    id: number
}
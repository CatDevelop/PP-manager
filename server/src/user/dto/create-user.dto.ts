import {IsEmail, IsString, IsStrongPassword, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsString()
    login: string;

    @IsEmail()
    email: string;

    @MaxLength(20, {message: "First name length must be less than 20 symbols"})
    firstName: string;

    @MaxLength(20, {message: "Second name length must be less than 20 symbols"})
    secondName: string;

    @MinLength(6, {message: "Password must be more than 6 symbols"})
    password: string;
}

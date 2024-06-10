import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "src/enums/users.enum";

export class CreateUserDto {
    @ApiProperty({ name: 'first_name' })
    @Expose({ name: 'first_name' })
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @ApiProperty({ name: 'last_name' })
    @Expose({ name: 'last_name' })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        enum: UserRole,
        required: true,
    })
    @IsEnum(UserRole)
    role: UserRole;
}

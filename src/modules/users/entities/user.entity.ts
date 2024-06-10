import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { UserRole } from "src/enums/users.enum";
import { BaseModel } from "src/utils/base.model";

export class User extends BaseModel {
    static tableName = 'users'

    @ApiProperty({ name: 'first_name' })
    @Expose({ name: 'first_name' })
    firstName: string;
  
    @ApiProperty({ name: 'last_name' })
    @Expose({ name: 'last_name' })
    lastName: string;

    @ApiHideProperty()
    @Exclude()
    password: string;

    email: string;
    role: UserRole;
}

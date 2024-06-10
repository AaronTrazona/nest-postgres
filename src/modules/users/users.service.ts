import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ModelClass } from 'objection';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private userModel: ModelClass<User>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.query().where({ email: createUserDto.email }).returning('*').first()

    if (user) {
      throw new BadRequestException('Email already exists.')
    }

    const saltOrRounds = 10
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds)

    return this.userModel.query().insert(createUserDto).returning('*')
  }

  findAll() {
    return this.userModel.query()
  }

  findOne(id: string) {
    return this.userModel.query().findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.query().findById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.userModel.query().patch(updateUserDto).where({ id }).returning('*').first()
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.query().findById(id)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.userModel.query().delete().where({ id })
  }
}

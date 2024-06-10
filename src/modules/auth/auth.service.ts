import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return 'This action adds a new auth';
  }
}

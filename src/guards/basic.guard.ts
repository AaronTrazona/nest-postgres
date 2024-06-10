import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IncomingHttpHeaders, IncomingMessage } from 'http';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IncomingMessage>();
    return this.validateBasicAuth(request.headers);
  }

  validateBasicAuth(headers: IncomingHttpHeaders): boolean {
    if (headers && headers.authorization) {
      const [, base64Auth] = headers.authorization.split(' ');
      const [username, password] = Buffer.from(base64Auth, 'base64')
        .toString()
        .split(':');
      if (
        this.configService.get<string>('BASIC_AUTH_USERNAME') === username &&
        this.configService.get<string>('BASIC_AUTH_PASSWORD') === password
      ) {
        return true;
      }
    }

    throw new UnauthorizedException();
  }
}

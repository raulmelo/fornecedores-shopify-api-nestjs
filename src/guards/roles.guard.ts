import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jtwService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const HasAuthorization = request.headers.authorization;

    if (!HasAuthorization || HasAuthorization === 'null') {
      return false;
    }

    const token = HasAuthorization.split(' ')[1];

    const dataToken = this.jtwService.decode(token);
    if (!dataToken) {
      return false;
    }

    return roles.some((role) => role === dataToken['role']);
  }
}

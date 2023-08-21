import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminType } from './entities/admin-type.enum';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<AdminType[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    const userRole = user?.roles;

    // Проверяем, что у пользователя есть соответствующая роль
    return requiredRoles.includes(userRole);
  }
}
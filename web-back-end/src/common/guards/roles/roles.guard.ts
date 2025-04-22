import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler())
    if (!requiredRole) return true

    const { user } = context.switchToHttp().getRequest()
    if (!user || user.role !== requiredRole) {
      throw new ForbiddenException('Access denied : you do not have required rights')
    }

    return true
  }
}

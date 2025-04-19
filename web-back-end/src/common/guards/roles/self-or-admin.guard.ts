// src/common/guards/self-or-admin.guard.ts

import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const paramId = parseInt(request.params.id, 10)

    if (!user) {
      throw new ForbiddenException('User dont authenticate')
    }

    const isAdmin = user.role === 'ADMIN'
    const isSelf = user.id === paramId

    if (!isAdmin && !isSelf) {
      throw new ForbiddenException('Access forbiden.')
    }

    return true
  }
}

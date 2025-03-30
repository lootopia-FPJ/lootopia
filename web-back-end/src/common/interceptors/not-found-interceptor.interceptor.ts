import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable, tap } from 'rxjs'

@Injectable()
export class NotFoundInterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (!data) {
          throw buildError(context.switchToHttp().getRequest<Request>().originalUrl)
        }
      })
    )
  }
}

const extractRessourceAndIdentifier = (
  url: string
): { resource: string; identifier: string } | null => {
  const regex = /\/api\/([^\/]+)\/(\d+)/
  const match = url.match(regex)

  if (!match) {
    return null
  }

  return {
    resource: match[1],
    identifier: match[2],
  }
}

const buildError = (url: string) => {
  const extracted = extractRessourceAndIdentifier(url)

  if (!extracted) {
    return new NotFoundException('Not Found')
  }

  return new NotFoundException(
    `Resource (${extracted.resource}) with id ${extracted.identifier} not found`
  )
}

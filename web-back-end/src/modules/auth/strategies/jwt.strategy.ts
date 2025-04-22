/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { AccessTokenPayload } from '../types/access-token-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req?.cookies?.jwt || null,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    })
  }

  async validate(payload: AccessTokenPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      type: payload.type,
      nickname: payload.nickname ?? '',
      phone_number: payload.phone_number ?? '',
      profile_picture: payload.profile_picture ?? '',
    }
  }
}

export interface AccessTokenPayload {
  sub: number
  email: string
  role: string
  type: string
  nickname?: string
  phone_number?: string
  profile_picture?: string
}

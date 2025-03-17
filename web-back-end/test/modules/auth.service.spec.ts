import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { AuthService } from '../../src/modules/auth/auth.service'
import { User } from '../../src/modules/users/entities/user.entity'
import { UserConsent } from '../../src/modules/users/entities/user-consent.entity'
import { UserRole } from '../../src/modules/users/entities/user-role.entity'
import { EmailService } from '../../src/modules/email/email.service'
import { BadRequestException } from '@nestjs/common'

describe('AuthService', () => {
  let service: AuthService
  let userRepo: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserConsent),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserRole),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: EmailService,
          useValue: {
            sendActivationEmail: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    userRepo = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should throw BadRequestException if user already exists', async () => {
    const existingUser = new User()
    jest.spyOn(userRepo, 'findOne').mockResolvedValue(existingUser)

    await expect(
      service.register({
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        type: 'COMMUN',
      })
    ).rejects.toThrow(BadRequestException)
  })
})
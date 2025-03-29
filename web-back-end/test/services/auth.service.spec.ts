import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from '../../src/modules/auth/auth.service'
import User from '../../src/modules/users/entities/user.entity'
import UserConsent from '../../src/modules/users/entities/user-consent.entity'
import { EmailService } from '../../src/modules/email/email.service'
import { BadRequestException } from '@nestjs/common'
import { UserType } from '../../src/modules/users/entities/user.entity'
import { RegisterUserDto } from '../../src/modules/auth/dto/register-user.dto'
import { Role } from '../../src/modules/users/entities/role.entity'

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
          provide: getRepositoryToken(Role),
          useClass: Repository,
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

    const newUser = new RegisterUserDto();
    newUser.email = 'test@example.com',
    newUser.password = 'password',
    newUser.name = 'Test User',
    newUser.type = UserType.COMMUN

    await expect(
      service.register(newUser)
    ).rejects.toThrow(BadRequestException)
  })
})

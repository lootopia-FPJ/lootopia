import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as nodemailer from 'nodemailer'
import User from '../users/entities/user.entity'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private transporter: nodemailer.Transporter

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    })
  }

  async sendActivationEmail(email: string, userId: number) {
    const token = this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '24h',
      }
    )

    const activationLink = `http://localhost:5173/api/auth/activate?token=${token}`

    const mailOptions = {
      from: `Lootopia <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Activate your Lootopia account 🎉',
      html: `
        <p>Welcome to Lootopia!</p>
        <p>Click the link below to activate your account:</p>
        <a href="${activationLink}">Activate my account</a>
        <p>This link will expire in 24 hours.</p>
      `,
    }

    try {
      const result = await this.transporter.sendMail(mailOptions)
      this.logger.log(`Activation email sent successfully: ${result.messageId}`)
    } catch (error) {
      this.logger.error('Failed to send activation email', error)
      throw new InternalServerErrorException('Unable to send activation email')
    }
  }

  async activateAccount(token: string) {
    try {
      const decoded = this.jwtService.verify<{ sub: number }>(token, {
        secret: this.configService.get('JWT_SECRET'),
      })

      const user = await this.userRepo.findOne({ where: { id: decoded.sub } })
      if (!user) throw new BadRequestException('Invalid token')

      user.is_active = true
      await this.userRepo.save(user)

      return { message: 'Account activated successfully' }
    } catch (err: any) {
      this.logger.error('Error during account activation', err.stack)
      throw new BadRequestException('Invalid or expired activation link')
    }
  }
}

import { Injectable, BadRequestException, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as nodemailer from 'nodemailer'
import { User } from '../users/entities/user.entity'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async sendActivationEmail(email: string, userId: number) {
    const token = this.jwtService.sign({ sub: userId }, { expiresIn: '24h' })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const activationLink = `http://localhost:5173/auth/activate?token=${token}`

    await transporter.sendMail({
      from: `Lootopia <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Active ton compte Lootopia 🎉',
      html: `
        <p>Bienvenue sur Lootopia!</p>
        <p>Clique sur ce lien pour activer ton compte :</p>
        <a href="${activationLink}">Activer mon compte</a>
        <p>Le lien expire dans 24 heures.</p>
      `,
    })
  }

  async activateAccount(token: string) {
    try {
      const decoded = this.jwtService.verify<{ sub: number }>(token)
      const user = await this.userRepo.findOne({ where: { id: decoded.sub } })

      if (!user) throw new BadRequestException('Token invalide')

      user.is_active = true
      await this.userRepo.save(user)

      return { message: 'Account activated successfully' }
    } catch (err: any) {
      this.logger.error('Error while activating email', err.stack)
      throw new BadRequestException('Invalid link or expired')
    }
  }
}

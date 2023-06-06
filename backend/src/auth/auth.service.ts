import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { SignInDto } from './dto/signin.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    })
    return createdUser.save()
  }
  async signIn(signin: SignInDto): Promise<{ token: string }> {
    const { email, password } = signin
    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const token = this.jwtService.sign({ id: user._id })
    return { token }
  }
}

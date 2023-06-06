import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { User } from './schemas/user.schema'
import { Strategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate(payload) {
    const { id } = payload
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user
  }
}

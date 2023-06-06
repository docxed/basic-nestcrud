import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signup.dto'
import { SignInDto } from './dto/signin.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.authService.signUp(signUpDto)
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return await this.authService.signIn(signInDto)
  }
}

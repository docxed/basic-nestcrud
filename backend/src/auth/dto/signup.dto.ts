import { IsEmail, IsNotEmpty } from 'class-validator'
export class SignUpDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  readonly email: string

  readonly firstname: string

  readonly lastname: string

  @IsNotEmpty()
  readonly password: string
}

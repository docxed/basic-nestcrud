import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  timestamps: true,
})
export class Home {
  @Prop()
  name: string
  @Prop()
  age: number
}
export const HomeSchema = SchemaFactory.createForClass(Home)

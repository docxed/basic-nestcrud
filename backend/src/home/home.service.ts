import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Home } from './schemas/home.schema'

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(Home.name)
    private homeModel: mongoose.Model<Home>,
  ) {}

  async findAll(): Promise<Home[]> {
    const homes = await this.homeModel.find()
    return homes
  }
  async findOne(id: string): Promise<Home> {
    const home = await this.homeModel.findById(id)
    return home
  }
  async create(home: Home): Promise<Home> {
    const createdHome = new this.homeModel(home)
    return createdHome.save()
  }
  async update(id: string, home: Home): Promise<Home> {
    const updatedHome = await this.homeModel.findByIdAndUpdate(id, home, {
      new: true,
    })
    return updatedHome
  }
  async delete(id: string): Promise<Home> {
    const deletedHome = await this.homeModel.findByIdAndDelete(id)
    return deletedHome
  }
}

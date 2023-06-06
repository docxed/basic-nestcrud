import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { HomeService } from './home.service'
import { Home } from './schemas/home.schema'
import { AuthGuard } from '@nestjs/passport'

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  async getAllHomes(): Promise<Home[]> {
    return this.homeService.findAll()
  }

  @Get(':id')
  async getHome(@Param('id') id: string): Promise<Home> {
    return this.homeService.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard())
  async createHome(@Body() home: Home): Promise<Home> {
    return this.homeService.create(home)
  }

  @Put(':id')
  async updateHome(@Param('id') id: string, @Body() home: Home): Promise<Home> {
    return this.homeService.update(id, home)
  }

  @Delete(':id')
  async deleteHome(@Param('id') id: string): Promise<Home> {
    return this.homeService.delete(id)
  }
}

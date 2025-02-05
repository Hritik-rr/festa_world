import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body('token') firebaseToken: string) {
  //   console.log(firebaseToken);

  //   return this.authService.loginWithFirebase(firebaseToken);
  // }

  @Post('signup')
  async login(@Body() firebaseToken: string, email: string, password: string) {
    console.log(email, password);

    return this.authService.loginWithFirebase(email, password);
    // return this.authService.loginWithFirebase(firebaseToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  async getProtectedResource(@Request() req) {
    return { message: 'This is protected data', user: req.user };
  }

  // @Get('protected')
  // @UseGuards(AuthGuard('jwt'))
  // getProtectedResource(@Req() req) {
  //   return { message: 'You are authenticated!', user: req.user };
  // }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

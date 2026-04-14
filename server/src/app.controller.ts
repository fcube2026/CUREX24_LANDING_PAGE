import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-supabase')
  async testSupabase() {
    return this.appService.testConnection();
  }

  @Post('submit-onboarding')
  async submitOnboarding(@Body() data: Record<string, any>) {
    return this.appService.submitOnboarding(data);
  }
}

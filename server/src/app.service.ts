import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testConnection() {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('doctor_onboarding_questionnaire')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase Test Error:', error);
      return { status: 'error', error };
    }
    return { status: 'success', data };
  }

  async submitOnboarding(data: Record<string, any>) {
    const client = this.supabaseService.getClient();

    // Directly insert the data as it comes from the UI
    // Column names must be in snake_case to match doctor_onboarding_questionnaire table
    const { data: result, error } = await client
      .from('doctor_onboarding_questionnaire')
      .insert([data]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }
    return result;
  }
}

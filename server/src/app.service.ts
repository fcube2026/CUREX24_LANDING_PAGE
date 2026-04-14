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
      .from('questionnaire_responses')
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
    // Ensure that objects/arrays are stringified if needed, 
    // although the UI is now responsible for sending the correct format.
    const { data: result, error } = await client
      .from('questionnaire_responses')
      .insert([data]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }
    return result;
  }
}

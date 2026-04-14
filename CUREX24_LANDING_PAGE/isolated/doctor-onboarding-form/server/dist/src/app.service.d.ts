import { SupabaseService } from './supabase.service';
export declare class AppService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    getHello(): string;
    testConnection(): Promise<{
        status: string;
        error: import("@supabase/supabase-js").PostgrestError;
        data?: undefined;
    } | {
        status: string;
        data: {
            count: number;
        }[];
        error?: undefined;
    }>;
    submitOnboarding(data: Record<string, any>): Promise<null>;
}

import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    testSupabase(): Promise<{
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

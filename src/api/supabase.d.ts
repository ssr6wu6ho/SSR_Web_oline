// src/api/supabase.d.ts
declare module './supabase' {
    import { SupabaseClient } from '@supabase/supabase-js';
    const supabase: SupabaseClient;
    export default supabase;
  }
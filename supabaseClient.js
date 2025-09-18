import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adgfxdjtnqjpnbmpdsur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZ2Z4ZGp0bnFqcG5ibXBkc3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNDg2MTUsImV4cCI6MjA2MzYyNDYxNX0.kBYz6LcwhuJkaEesWNK4qNlA0pDH4cx2F_cWId8vKs8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
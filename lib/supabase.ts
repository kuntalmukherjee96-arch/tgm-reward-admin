import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninulhvgcpcsvoswhckn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJlUzI1NilsInR5cCl6lkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZil6lm5pbnVsaHZnY3B0c3Zvc3doY2tuliwicm9sZSI6ImFub24iLCJpYXQIOjE3ODM5NTUONJAsimV4cCl6MjA5OTUzMTQ2MH0.f67_NapwhPem8aGrWB6aB0rqjl5ry2N6ozaCY4U1nNd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
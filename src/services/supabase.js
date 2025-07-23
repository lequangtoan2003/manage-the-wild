import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://lecnynvyzqecwagnlftj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlY255bnZ5enFlY3dhZ25sZnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTU2OTAsImV4cCI6MjA2ODQ5MTY5MH0.B4dcpvI7iUizQQhnQKCotYjqNMu7tsHZfv4i518VaNI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

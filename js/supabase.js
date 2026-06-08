import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const SUPABASE_URL = 'https://ubjcgmqmxksfsiymtmth.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViamNnbXFteGtzZnNpeW10bXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM5MDksImV4cCI6MjA5NjQ2OTkwOX0.xzdpvw--tfGcXoOCSVOBOszhifd3FMM6nZm2pl2fr2s';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

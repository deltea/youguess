import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://pqudokhmwmphnyawpgoy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdWRva2htd21waG55YXdwZ295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NTIzOTUsImV4cCI6MjAwODQyODM5NX0.j_NMZMHOu56b9oJYNpa11JTQ9MnYnVOJgFssNYp3VWU");

export interface Leader {
  name: string,
  score: number,
}

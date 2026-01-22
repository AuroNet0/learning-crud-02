import { createClient } from '@supabase/supabase-js'

const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export const db = supabase
export const auth = supabase.auth
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fqriihzeuzuxavnrnqjh.supabase.co";
const supabaseKey = "sb_publishable_sRl2H6a12St3qA9PRWvHrg_4k4RbRco";

export const supabase = createClient(supabaseUrl, supabaseKey);
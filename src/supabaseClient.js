import { createClient } from "@supabase/supabase-js";

// =========================================================================
// 1) PASTE YOUR SUPABASE PROJECT URL HERE:
// =========================================================================
const SUPABASE_URL = "https://wkuwnfslujnfxlmhovhq.supabase.co/rest/v1/";

// =========================================================================
// 2) PASTE YOUR SUPABASE PUBLIC KEY (ANON KEY) HERE:
// =========================================================================
const SUPABASE_PUBLIC_KEY = "sb_publishable_Dsy_psFVxy1Rd_38BTsMhA_EetfR20L";

// Normalize the URL in case /rest/v1/ was included, so Auth, Realtime, and Storage work seamlessly
const normalizedUrl = SUPABASE_URL ? SUPABASE_URL.replace(/\/rest\/v1\/?$/, "") : SUPABASE_URL;

// =========================================================================
// 3) SUPABASE CLIENT INSTANCE:
// =========================================================================
export const supabase = createClient(normalizedUrl, SUPABASE_PUBLIC_KEY);

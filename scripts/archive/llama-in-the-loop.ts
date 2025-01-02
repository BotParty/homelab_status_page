let     url = 'https://twittervideodownloader.com/'

import ollama from 'ollama';
import { createClient } from '@supabase/supabase-js';

//const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const { data, error } = await client.from('tweets').select('*').eq('id', '1');

console.log(data);
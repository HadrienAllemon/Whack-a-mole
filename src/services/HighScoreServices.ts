import fs from "fs/promises";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qonbttcfwhymrikmuxdg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const FILE_PATH = "highscores.json"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getHighscores() {
    try {
        let { data, error } = await supabase
            .from('HighScores')
            .select('*')
            .order('score', { ascending: false });
        if (error) {
            console.error("Supabase error:", error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.error("Error reading highscores:", err);
        return [];
    }
}

export async function addHighscore(entry: any) {
    try {
        await supabase.auth.signInWithPassword({
            email: import.meta.env.VITE_DUMMY_EMAIL,
            password: import.meta.env.VITE_DUMMY_PASSWORD,
        });
        let { data, error } = await supabase
            .from('HighScores')
            .insert([entry]);
        if (error) {
            console.error("Supabase error:", error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.error("Error writing highscores:", err);
        return [];
    }
}
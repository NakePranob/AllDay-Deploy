import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from 'uuid';

async function uploadFileToSupabase(file: File, folder: string) {
    const fileName = uuidv4();
    const { error } = await supabase.storage.from(folder).upload(fileName, file);
    if (error) throw new Error(`File upload error: ${error.message}`);
    return fileName;
}

async function removeFileToSupabase(fileName:string, folder: string) {
    const { error } = await supabase.storage.from(folder).remove([fileName]);
    if (error) throw new Error(`File upload error: ${error.message}`);
    return true;
}

export { uploadFileToSupabase, removeFileToSupabase };
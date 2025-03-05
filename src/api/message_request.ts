// request.ts
import supabase from "./supabase";

export interface Message {
  id?: number;
  user_id: string;
  created_at: string;
  content: string;
  author_name: string;
  author_avatar: string;
}

export const getMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  return data as Message[];
};

export const insertMessage = async (message: {
  user_id: string;
  content: string;
  author_name: string;
  author_avatar: string;
}) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        user_id: message.user_id,
        content: message.content,
        author_name: message.author_name,
        author_avatar: message.author_avatar,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting message:", error);
    return null;
  }
  return data;
};

import { connectToDB } from "@utils/database";
import prompt from "@models/Prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new prompt ({creator:userId , prompt , tag})
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt),{status:201})
  } catch (error) {
    return new Response("failed connect" , {status:500})
    console.log(error)
  }
};

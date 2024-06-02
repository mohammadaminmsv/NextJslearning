import { connectToDB } from "@utils/database";
import prompt from "@models/Prompt";

export const Get = async (request) => {
  try {
    await connectToDB();

    const prompts = await prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failes to fetch all prompts", { status: 500 });
  }
};

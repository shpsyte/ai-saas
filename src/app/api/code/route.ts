import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionsMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer the code only in markdown code snippets. and also you MUST return the explanation using code comments .",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    const { apiKey } = configuration;

    if (!userId) {
      return new NextResponse("Unauthorized user not found", { status: 401 });
    }
    if (!apiKey) {
      return new NextResponse("Unauthorized key not found", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionsMessage, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error("[CODE_ERROR]", error);

    return new NextResponse("Error", { status: 500 });
  }
}

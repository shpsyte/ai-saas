import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { checkApiLimit, increaseApiLimit } from "@/lib/api.limit";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);
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

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("You have reached the limit of free trial", {
        status: 403,
      });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increaseApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error({ error });

    return new NextResponse("Error", { status: 500 });
  }
}

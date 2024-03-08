import { checkApiLimit, increaseApiLimit } from "@/lib/api.limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;
    const { apiKey } = configuration;

    if (!userId) {
      return new NextResponse("Unauthorized user not found", { status: 401 });
    }
    if (!apiKey) {
      return new NextResponse("Unauthorized key not found", { status: 401 });
    }

    if (!resolution) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("You have reached the limit of free trial", {
        status: 403,
      });
    }

    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiLimit();

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error({ error });

    return new NextResponse("Error", { status: 500 });
  }
}

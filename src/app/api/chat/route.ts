import { google } from '@ai-sdk/google';
import { generateText, streamText, convertToCoreMessages } from 'ai';
import { NextResponse } from 'next/server';

interface Message {
  role: string;
  content: string;
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const getUserPrompt = (messages: Message[]) => {
    return messages.find((msg: Message) => msg.role === 'user')?.content;
  };

  const userPrompt = getUserPrompt(messages);

  if (
    userPrompt &&
    userPrompt.toLowerCase().includes('generate description for')
  ) {
    const productTitle = userPrompt
      .replace('generate description for:', '')
      .trim();

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: `Generate a description for: ${productTitle}. Ensure it is detailed yet engaging, highlighting key features, benefits, and potential use cases. Make it appealing to the target audience and include a couple of relevant emojis to enhance its attractiveness. And don't make it too long`,
      system:
        'You are an expert product description writer with a focus on enhancing customer appeal. Use persuasive language to appeal to potential buyers, emphasizing why this product stands out in its category.',
    });

    return NextResponse.json({ text });
  }

  const result = await streamText({
    model: google('models/gemini-pro'),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}

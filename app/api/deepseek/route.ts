import { NextRequest } from 'next/server';
import { API_CONFIG } from '@/lib/constants';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { messages }: RequestBody = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(API_CONFIG.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages,
        max_tokens: API_CONFIG.MAX_TOKENS,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'DeepSeek API error' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a TransformStream for streaming the response
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let usage = { prompt_tokens: 0, completion_tokens: 0 };

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk, { stream: true });
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              // Send final usage stats
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ done: true, usage })}\n\n`)
              );
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              
              // Capture usage if available
              if (parsed.usage) {
                usage = {
                  prompt_tokens: parsed.usage.prompt_tokens || usage.prompt_tokens,
                  completion_tokens: parsed.usage.completion_tokens || usage.completion_tokens,
                };
              }

              if (content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      },
    });

    // Pipe the response through our transform stream
    const readableStream = response.body?.pipeThrough(transformStream);

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

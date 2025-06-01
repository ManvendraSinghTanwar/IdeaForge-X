"use server"

import { generateText } from "ai"
import { createTogetherAI } from "@ai-sdk/togetherai"

export async function generateContent(formData: {
  keyword: string
  goal: string
  audience: string
  tone: string
  creativity: number[]
  contentType: string
  additionalContext: string
}) {
  const { keyword, goal, audience, tone, creativity, contentType, additionalContext } = formData

  const creativityLevel = creativity[0]

  // Simplified system prompt
  const systemPrompt = `You are an expert content creator. Create engaging ${contentType} content about "${keyword}" that helps people ${goal}.

Tone: ${tone}
Audience: ${audience || "general audience"}
${additionalContext ? `Additional context: ${additionalContext}` : ""}

IMPORTANT: Always respond with valid JSON only. No other text before or after the JSON.`

  // Simplified content prompts that are more likely to work
  const contentPrompts = {
    twitter: `Create a Twitter thread about ${keyword}. Return this exact JSON structure:
{
  "hook": "Write a compelling opening tweet (under 280 characters)",
  "thread": [
    "Write tweet 2 content",
    "Write tweet 3 content", 
    "Write tweet 4 content",
    "Write tweet 5 content"
  ],
  "hashtags": ["#${keyword.replace(/\s+/g, "")}", "#ContentCreator", "#Tips"],
  "cta": "Write a call-to-action tweet"
}`,

    instagram: `Create an Instagram post about ${keyword}. Return this exact JSON structure:
{
  "caption": "Write an engaging Instagram caption with emojis and line breaks",
  "hashtags": ["#${keyword.replace(/\s+/g, "")}", "#Instagram", "#Content", "#Tips", "#Motivation", "#Success", "#Growth", "#Inspiration", "#Business", "#Life"],
  "cta": "Write a call to action",
  "imagePrompt": "Describe what image would work best for this post"
}`,

    blog: `Create a blog post about ${keyword}. Return this exact JSON structure:
{
  "title": "Write an SEO-friendly blog title",
  "metaDescription": "Write a 150-character meta description",
  "introduction": "Write an engaging introduction paragraph",
  "sections": [
    {
      "heading": "First section heading",
      "content": "First section content"
    },
    {
      "heading": "Second section heading",
      "content": "Second section content"
    },
    {
      "heading": "Third section heading", 
      "content": "Third section content"
    }
  ],
  "conclusion": "Write a conclusion with call to action",
  "tags": ["${keyword}", "tips", "guide"]
}`,

    youtube: `Create a YouTube video script about ${keyword}. Return this exact JSON structure:
{
  "title": "Write a compelling YouTube title",
  "description": "Write a video description",
  "hook": "Write the first 15 seconds script to hook viewers",
  "introduction": "Write the introduction section",
  "mainContent": [
    {
      "timestamp": "1:00",
      "section": "First main point",
      "content": "What to say in this section"
    },
    {
      "timestamp": "3:00",
      "section": "Second main point",
      "content": "What to say in this section"
    },
    {
      "timestamp": "5:00",
      "section": "Third main point",
      "content": "What to say in this section"
    }
  ],
  "conclusion": "Write conclusion and call to action",
  "tags": ["${keyword}", "tutorial", "tips"]
}`,

    email: `Create an email campaign about ${keyword}. Return this exact JSON structure:
{
  "subject": "Write a compelling subject line",
  "preheader": "Write preview text",
  "greeting": "Write a personal greeting",
  "body": "Write the main email content with paragraphs",
  "cta": "Write a clear call-to-action",
  "signature": "Best regards,\\nYour Name\\nYour Company",
  "ps": "Write an optional P.S. message"
}`,

    linkedin: `Create a LinkedIn post about ${keyword}. Return this exact JSON structure:
{
  "hook": "Write an attention-grabbing opening line",
  "story": "Write the main content with professional storytelling",
  "insights": "Write key takeaways or insights",
  "cta": "Write a professional call-to-action",
  "hashtags": ["#${keyword.replace(/\s+/g, "")}", "#Professional", "#Business", "#Growth", "#Success"]
}`,
  }

  const prompt =
    contentPrompts[contentType as keyof typeof contentPrompts] ||
    `Create ${contentType} content about ${keyword} that helps people ${goal}. Return as JSON with title, content, and hashtags fields.`

  try {
    console.log("🚀 Starting content generation...")
    console.log("📝 Content type:", contentType)
    console.log("🔑 Keyword:", keyword)

    // Check if API key exists
    if (!process.env.TOGETHER_API_KEY) {
      throw new Error("TOGETHER_API_KEY environment variable is not set")
    }

    // Create Together AI instance
    const togetherai = createTogetherAI({
      apiKey: process.env.TOGETHER_API_KEY,
    })

    console.log("🤖 Calling Llama 3.3 70B...")

    const { text } = await generateText({
      model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
      system: systemPrompt,
      prompt: prompt,
      temperature: Math.min(creativityLevel / 100, 0.9), // Cap at 0.9
      maxTokens: 2000,
    })

    console.log("✅ AI Response received")
    console.log("📄 Raw response:", text.substring(0, 200) + "...")

    // Clean the response - remove any markdown formatting or extra text
    let cleanedText = text.trim()

    // Remove markdown code blocks if present
    cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*/g, "")

    // Find JSON object in the response
    const jsonStart = cleanedText.indexOf("{")
    const jsonEnd = cleanedText.lastIndexOf("}") + 1

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedText = cleanedText.substring(jsonStart, jsonEnd)
    }

    console.log("🧹 Cleaned response:", cleanedText.substring(0, 200) + "...")

    // Try to parse as JSON
    try {
      const parsedContent = JSON.parse(cleanedText)
      console.log("✅ JSON parsed successfully")

      return {
        ...parsedContent,
        platform: contentType,
        generatedAt: new Date().toISOString(),
        model: "Llama 3.3 70B",
      }
    } catch (parseError) {
      console.error("❌ JSON parsing failed:", parseError)
      console.log("🔍 Attempting fallback parsing...")

      // Fallback: Create structured content from plain text
      return createFallbackContent(cleanedText, contentType, keyword, goal)
    }
  } catch (error) {
    console.error("❌ Content generation error:", error)

    // Return a user-friendly error with fallback content
    throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Fallback function to create structured content when JSON parsing fails
function createFallbackContent(text: string, contentType: string, keyword: string, goal: string) {
  console.log("🔄 Creating fallback content...")

  const baseContent = {
    platform: contentType,
    generatedAt: new Date().toISOString(),
    model: "Llama 3.3 70B (Fallback)",
  }

  switch (contentType) {
    case "twitter":
      return {
        ...baseContent,
        hook: `🧵 Let's talk about ${keyword}...`,
        thread: [
          `Here's what you need to know about ${keyword}:`,
          text.substring(0, 250) + "...",
          `This can help you ${goal}.`,
          "What's your experience with this?",
        ],
        hashtags: [`#${keyword.replace(/\s+/g, "")}`, "#Tips", "#Thread"],
        cta: "Follow for more insights! 🚀",
      }

    case "instagram":
      return {
        ...baseContent,
        caption: `✨ ${keyword} insights ✨\n\n${text.substring(0, 300)}...\n\nDouble tap if you agree! 💖`,
        hashtags: [`#${keyword.replace(/\s+/g, "")}`, "#Tips", "#Motivation", "#Success", "#Growth"],
        cta: "Save this post for later! 📌",
        imagePrompt: `A motivational image about ${keyword}`,
      }

    case "blog":
      return {
        ...baseContent,
        title: `The Ultimate Guide to ${keyword}`,
        metaDescription: `Learn everything about ${keyword} and how it can help you ${goal}.`,
        introduction: `In this comprehensive guide, we'll explore ${keyword} and how it can help you ${goal}.`,
        sections: [
          {
            heading: `Understanding ${keyword}`,
            content: text.substring(0, 400) + "...",
          },
          {
            heading: `How to Apply This`,
            content: `Here are practical ways to implement ${keyword} in your daily life...`,
          },
          {
            heading: `Next Steps`,
            content: `Now that you understand ${keyword}, here's what to do next...`,
          },
        ],
        conclusion: `${keyword} is a powerful tool that can help you ${goal}. Start implementing these strategies today!`,
        tags: [keyword, "guide", "tips"],
      }

    case "youtube":
      return {
        ...baseContent,
        title: `${keyword}: Everything You Need to Know`,
        description: `In this video, we cover ${keyword} and how it helps you ${goal}.`,
        hook: `What if I told you that ${keyword} could change everything?`,
        introduction: `Welcome back! Today we're diving deep into ${keyword}.`,
        mainContent: [
          {
            timestamp: "1:00",
            section: `What is ${keyword}?`,
            content: text.substring(0, 200) + "...",
          },
          {
            timestamp: "3:00",
            section: "Practical Applications",
            content: `Here's how you can use ${keyword} to ${goal}...`,
          },
          {
            timestamp: "5:00",
            section: "Common Mistakes",
            content: `Avoid these common mistakes when working with ${keyword}...`,
          },
        ],
        conclusion: `That's a wrap on ${keyword}! Don't forget to subscribe for more content like this.`,
        tags: [keyword, "tutorial", "guide"],
      }

    case "email":
      return {
        ...baseContent,
        subject: `Your ${keyword} Guide is Here!`,
        preheader: `Everything you need to know about ${keyword}`,
        greeting: "Hi there!",
        body: `I wanted to share some insights about ${keyword} with you.\n\n${text.substring(0, 400)}...\n\nThis can really help you ${goal}.`,
        cta: "Learn More",
        signature: "Best regards,\nYour Name\nYour Company",
        ps: `P.S. Don't miss out on mastering ${keyword}!`,
      }

    case "linkedin":
      return {
        ...baseContent,
        hook: `Here's what I learned about ${keyword}:`,
        story: text.substring(0, 500) + "...",
        insights: `Key takeaway: ${keyword} can significantly help you ${goal}.`,
        cta: "What's your experience with this? Share in the comments!",
        hashtags: [`#${keyword.replace(/\s+/g, "")}`, "#Professional", "#Growth", "#Success"],
      }

    default:
      return {
        ...baseContent,
        title: `Content about ${keyword}`,
        content: text,
        hashtags: [`#${keyword.replace(/\s+/g, "")}`, "#Content"],
        cta: `Ready to master ${keyword}?`,
      }
  }
}

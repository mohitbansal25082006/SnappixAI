import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not configured')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// AI model selection based on complexity
export const getAImodel = (complexity: 'simple' | 'complex') => {
  return complexity === 'complex' 
    ? 'gpt-4-vision-preview' 
    : 'gpt-3.5-turbo'
}

// Rate limiting for free tier
export const AI_CONFIG = {
  maxDailyRequests: 5,
  timeout: 30000, // 30 seconds
  retryAttempts: 2,
}
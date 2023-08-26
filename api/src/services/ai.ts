import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

import { logger } from 'src/lib/logger'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        description: z
            .string()
            .describe('this is a description of an the objective that I am trying to achieve for a given time frame.'),
        status: z
            .string()
            .describe('this is current status of the objective (i.e. In Progress, Not Started, Completed)'),
        startDate: z
            .date()
            .describe('this will be start date of object. If no time period is given use 2023. (i.e. Month, Day, Year)'),
        endDate: z
            .date()
            .describe('this will be start date of object. If no time period is given use 2023. (i.e. Month, Day, Year)'),
        actions: z.array(
            z.object({
                description: z
                    .string()
                    .describe('this is a description of the action associated with the objective.'),
                dueDate: z
                    .date()
                    .describe('this will be the due date for the action. (i.e. Month, Day, Year)'),
                status: z
                    .string()
                    .describe('this is current status of the action (i.e. In Progress, Not Started, Completed)')
            })
        ).describe('these are the actions associated with the objective')
    })
)


const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
        `You are an assistant that helps me reach my MBOs or OKRs goals. You will prompt me to meet these goals matching the format
        instruction and format your response to match the format instructions, no matter what! {format_instructions} {entry}`,
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })

    const input = await prompt.format({
        entry: content,
    })

    logger.warn(input, 'Prompt Template')

    return input
}

export const getAi = async (message: { prompt: string }) => {

    const input = await getPrompt(message.prompt)
    const model = new OpenAI({ temperature: 1, modelName: 'gpt-3.5-turbo'})
    const result = await model.call(input)
    
    return {
        result
    }
}
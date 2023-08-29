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
        keyResults: z.array(
            z.object({
                actionName: z
                    .string()
                    .describe('this is a label or name for the group of actions associated with the key result. Generate a fun group name for the actions.'),
                description: z
                    .string()
                    .describe('this is a description of the action associated with the objective.'),
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
                ).describe('these are the actions associated with the key result. Each action should be completed to achieve the key result. Only one set of actions per key result.')
            })
        ).describe('these are the key result each of the objectives are should achieve to show business or personal value.')            
    }).describe('this is the format for the objectives, key results, and actions that I am trying to achieve for a given time frame.')
)


const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
        `You are an assistant that helps me reach my MBOs or OKRs goals. When generating objectives, key result, and actions the relationship
        should be a objective can generate many key results and key result has many actions grouped in 4 week intervals when possible. It is
        okay to suggest additional key results and actions when {entry} already has some. You will prompt me to meet these objectives, results, and achievemnts
        matching the format instruction and format your response to match the format instructions, no matter what! {format_instructions} {entry}`,
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    })

    const input = await prompt.format({
        entry: content,
    })

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
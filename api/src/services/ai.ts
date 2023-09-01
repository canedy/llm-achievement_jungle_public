import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
import { ObjectiveType, Status } from 'types/graphql'


const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        description: z
            .string()
            .describe('this is a description of an the objective that I am trying to achieve for a given time frame.'),
        type: z
            .string()
            .describe('this is the current type based on goal, result, and actions. Determine which of the following types to apply. (i.e. Company, Development, Training, Networking, Personal'),
        status: z
            .string()
            .describe('this is current status of the objective. Should always be NotStarted'),
        startDate: z
            .date()
            .describe('this will be start date of object. If no time period is given use 2023. Use the MM/DD/YYYY format'),
        endDate: z
            .date()
            .describe('this will be start date of object. If no time period is given use 2023. Use the MM/DD/YYYY format'),
        results: z.array(
            z.object({
                description: z
                    .string()
                    .describe('this is a description of the action associated with the objective.'),
                status: z
                    .string()
                    .describe('this is current status of the objective. Should always be NotStarted'),
                dueDate: z
                    .date()
                    .describe('this is the date the result is due to meet the main goal end date. If no time period is given use 2023. Use the MM/DD/YYYY format'),                    
                actions: z.array(
                    z.object({
                        description: z
                            .string()
                            .describe('this is a description of the action associated with the objective.'),
                        status: z
                            .string()
                            .describe('this is current status of the action. Should always be NotStarted')
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

export const createAi = async (message: { prompt: string }) => {

    const input = await getPrompt(message.prompt)
    const model = new OpenAI({ temperature: 1, modelName: 'gpt-3.5-turbo'})
    const result = await model.call(input)

    const obj = JSON.parse(result);

    const createGoal = await db.goal.create({
        data: {
            type: obj.type,
            description: obj.description,
            status: obj.status,
            start_date: new Date(),
            end_date: new Date(),
        },
    })

    for(let i = 0; i < obj.results.length; i++) {
        const createResult = await db.result.create({
            data: {
                goal_id: createGoal.id,
                description: obj.results[i].description,
                status: obj.results[i].status,
                due_date: new Date(),
            },
        })
        for(let j = 0; j < obj.results[i].actions.length; j++) {
            const createAction = await db.action.create({
                data: {
                    result_id: createResult.id,
                    description: obj.results[i].actions[j].description,
                    status: obj.results[i].actions[j].status,
                },
            })
        }
    }

    // obj.result.map(async (item: { description: string; status: Status }) => {
    //     const createResult = await db.result.create({
    //         data: {
    //             goal_id: createGoal.id,
    //             description: item.description,
    //             status: item.status,
    //             due_date: new Date(),
    //         },
    //     })
    // })  

    // const createAction = await db.action.create({
    //     data: {
    //         result_id: createResult.id,
    //         description: obj.results[0].actions[0].description,
    //         status: obj.results[0].actions[0].status,
    //     },
    // })
    
    return {
        result
    }
}
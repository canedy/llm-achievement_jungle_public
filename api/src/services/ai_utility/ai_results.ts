import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
import { goal } from '../goals/goals'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        id: z.number().describe('this is the id of the goal. Do not attempt to generate a goal.'),
        results: z.array(
            z.object({
                description: z
                    .string()
                    .describe('this is a description of the result associated with the goal.'),
                status: z
                    .string()
                    .describe('this is current status of the goal. Should always be NotStarted'),
                dueDate: z
                    .date()
                    .describe('Always choose a date you think the typical person can complete the task by. Always, with no excetption use the ISO-8601 DateTime using example format (YYYY-MM-DDThh:mm:ss.sssZ) or (YYYY-MM-DDThh)'),                    
                actions: z.array(
                    z.object({
                        description: z
                            .string()
                            .describe('this is a description of the action associated with a result.'),
                        status: z
                            .string()
                            .describe('this is current status of the action. Should always be NotStarted')
                    })
                ).describe('these are the actions associated with a result. Generate as many detailed action as you can to complete the desired result.')
            })
        ).describe('this is the format for the results and actions that I am trying to achieve for a given goal. Generate as many results as possible to acieve my goal.')
    }).describe('Do not attempt to generate a goal.')
)

const getPrompt = async (promptValue: any, goalContentValue: any) => {

    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
        `You are an achievement coach who is a professional who helps others to set and achieve their goals, results, and actions. As my achievement coach, you know the following about
        me. {goalContent}. based on my {prompt} suggest new results that will help me achieve my goal. Attempt to always create three additional results that are unique from the original results. Use the following '{prompt}' as input into creating additional results. Do not attempt to
        create a goal. Match the format instruction and format your response to match the JSON  {format_instructions}, no matter what!`,
        inputVariables: ['prompt', 'goalContent'],
        partialVariables: { format_instructions },
    })



    const input = await prompt.format({
        prompt: promptValue,
        goalContent: goalContentValue
    })

    return input
}

export const createAiResult = async (data: any) => {
        
    const input = await getPrompt(data.input.prompt, data.input.goalContent)
    const model = new OpenAI({ temperature: 1, modelName: 'gpt-3.5-turbo'})
    const result = await model.call(input)

    logger.info({result}, 'result')

    const obj = JSON.parse(result);


    for(let i = 0; i < obj.results.length; i++) {
        const createResult = await db.result.create({
            data: {
                goal_id: data.input.goalId,
                description: obj.results[i].description,
                status: obj.results[i].status,
                due_date: obj.results[i].dueDate
            },
        })


        for(let j = 0; j < obj.results[i].actions.length; j++) {
            const createAction = await db.action.create({
                data: {
                    result_id: createResult.id,
                    description: obj.results[i].actions[j].description,
                    status: obj.results[i].actions[j].status
                },
            })
        }
    }
    
    return {
        result
    }
}
import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        goals: z.array(
        z.object({
        description: z
            .number()
            .describe('this is a description of the goal to obtain.'),
        results: z.array(
            z.object({
                description: z
                    .string()
                    .describe('this is a description of the result to achieve.'),
                status: z
                    .string()
                    .describe('this is current status of the goal. Never choose "Complete". Always choose "NotStarted" or "InProgress".'),
                // dueDate: z
                //     .date()
                //     .describe('Always choose a date you think the typical person can complete the task by. Always, with no excetption use the ISO-8601 DateTime using example format (YYYY-MM-DDThh:mm:ss.sssZ) or (YYYY-MM-DDThh)'),                    
                actions: z.array(
                    z.object({
                        description: z
                            .string()
                            .describe('this is a description of the action associated with a result and goal to achieve.'),
                        status: z
                            .string()
                            .describe('this is current status of the action. Never choose "Complete". Always choose "NotStarted" or "InProgress".')
                    })
                ).describe('these are the actions associated with a result.')
            })
        ).describe('this is the format for the results I am trying to achieve for a given goal.')
    }).describe('this is the format for the goal I am trying to achieve.')
)
    })
)


const getPrompt = async (promptValue: any) => {

    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
        `You are an achievement coach who is a professional who helps others to set and achieve their goals, results, and actions. As my achievement coach, you know the 
        following about me {prompt}. Please give me my next big three actions to accomplish from the list where the "status" is not "complete". Only show the most important 
        two goals you, as an achievement coach, believe I should achieve across all my goals. Never choose any actions that have the "status" of "Complete." Always select 
        actions with the "NotStarted" or "InProgress". Please limit your response no matter what you think I can do in the next seven days! Match the format instruction 
        and format your response to match the JSON {format_instructions}, no matter what!`,
        inputVariables: ['prompt'],
        partialVariables: { format_instructions },
    })

    const input = await prompt.format({
        prompt: promptValue,
        // goalContent: goalContentValue
    })

    return input
}

export const getAiBigThree = async (data: any) => {
    logger.info('here')
        
    const input = await getPrompt(data.input.prompt)
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo'})
    const result = await model.call(input)

    logger.info({result}, 'result')

    // const obj = JSON.parse(result);

    // for(let i = 0; i < obj.results.length; i++) {
    //     const createResult = await db.result.create({
    //         data: {
    //             goal_id: data.input.goalId,
    //             description: obj.results[i].description,
    //             status: obj.results[i].status,
    //             due_date: obj.results[i].dueDate
    //         },
    //     })

    //     for(let j = 0; j < obj.results[i].actions.length; j++) {
    //         const createAction = await db.action.create({
    //             data: {
    //                 result_id: createResult.id,
    //                 description: obj.results[i].actions[j].description,
    //                 status: obj.results[i].actions[j].status
    //             },
    //         })
    //     }
    // }
    
    return {
        result
    }
}
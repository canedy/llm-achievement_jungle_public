import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const goals: Prisma.GoalCreateArgs['data'][] = [
      { id: 1, type: 'Company', description: 'Graduate with a PhD in Artificial Intelligence or Machine Learning', status: 'InProgress', start_date: new Date("2023-01-01"), end_date: new Date("2023-12-31") }
    ]

    console.log('Seeding Goals ...')
    const createdGoal = await db.goal.create({ data: goals[0] })
    console.log('Done.', createdGoal)

    const results: Prisma.ResultCreateArgs['data'][] = [
      { goal_id: createdGoal.id, description: "Write and submit a research proposal on a topic related to Artificial Intelligence or Machine Learning", status: "InProgress", due_date: new Date("2023-06-30") },
      { goal_id: createdGoal.id, description: "Complete required coursework for the PhD program in AI or ML", status: "InProgress", due_date: new Date("2023-06-30") },
      { goal_id: createdGoal.id, description: "Publish at least one research article in a reputable conference or journal", status: "InProgress", due_date: new Date("2023-06-30") }
    ]

    console.log('Seeding Results ...')
    const createdResult0 = await db.result.create({ data: results[0] })
    const createdResult1 = await db.result.create({ data: results[1] })
    const createdResult2 = await db.result.create({ data: results[2] })
    console.log('Done.', createdResult0)

    const actions: Prisma.ActionCreateArgs['data'][] = [
      { result_id: createdResult0.id, description: "Conduct a literature review on the chosen research topic", note: "", status: "NotStarted" },
      { result_id: createdResult0.id, description: "Formulate research questions and hypotheses", note: "", status: "NotStarted" },
      { result_id: createdResult0.id, description: "Design and plan research experiments", note: "", status: "NotStarted" },
    ]    

    console.log('Seeding Actions ...')
    const createActions = await db.action.createMany({ data: actions })
    console.log('Done.', createActions)


    const actions1: Prisma.ActionCreateArgs['data'][] = [
      { result_id: createdResult1.id, description: "Conduct a literature review on the chosen research topic", note: "", status: "NotStarted" },
      { result_id: createdResult1.id, description: "Formulate research questions and hypotheses", note: "", status: "NotStarted" },
      { result_id: createdResult1.id, description: "Design and plan research experiments", note: "", status: "NotStarted" },
    ]    

    console.log('Seeding Actions ...')
    const createActions1 = await db.action.createMany({ data: actions1 })
    console.log('Done.', createActions1)

    const actions2: Prisma.ActionCreateArgs['data'][] = [
      { result_id: createdResult2.id, description: "Conduct a literature review on the chosen research topic", note: "", status: "NotStarted" },
      { result_id: createdResult2.id, description: "Formulate research questions and hypotheses", note: "", status: "NotStarted" },
      { result_id: createdResult2.id, description: "Design and plan research experiments", note: "", status: "NotStarted" },
    ]    

    console.log('Seeding Actions ...')
    const createActions2 = await db.action.createMany({ data: actions2 })
    console.log('Done.', createActions1)

  } catch (error) {
    console.error(error)
  }
}

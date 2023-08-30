import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    // const goals: Prisma.GoalCreateArgs['data'][] = [
    //   { id: 1, type: 'Company', description: 'Graduate with a PhD in Artificial Intelligence or Machine Learning', status: 'InProgress', start_date: new Date("2023-01-01"), end_date: new Date("2023-12-31") }
    // ]

    // console.log('Seeding Goals ...')
    // const createdGoal = await db.goal.create({ data: goals[0] })
    // console.log('Done.', createdGoal)

    // const results: Prisma.ResultCreateArgs['data'][] = [
    //   { goal_id: createdGoal.id, description: "Write and submit a research proposal on a topic related to Artificial Intelligence or Machine Learning", status: "InProgress", due_date: new Date("2023-06-30") },
    //   { goal_id: createdGoal.id, description: "Complete required coursework for the PhD program in AI or ML", status: "InProgress", due_date: new Date("2023-06-30") },
    //   { goal_id: createdGoal.id, description: "Publish at least one research article in a reputable conference or journal", status: "InProgress", due_date: new Date("2023-06-30") }
    // ]

    // console.log('Seeding Results ...')
    // const createdResult0 = await db.result.create({ data: results[0] })
    // const createdResult1 = await db.result.create({ data: results[1] })
    // const createdResult2 = await db.result.create({ data: results[2] })
    // console.log('Done.', createdResult0)

    // const actions: Prisma.ActionCreateArgs['data'][] = [
    //   { result_id: createdResult0.id, description: "Conduct a literature review on the chosen research topic", note: "", status: "NotStarted" },
    //   { result_id: createdResult0.id, description: "Formulate research questions and hypotheses", note: "", status: "NotStarted" },
    //   { result_id: createdResult0.id, description: "Design and plan research experiments", note: "", status: "NotStarted" },
    // ]    

    // console.log('Seeding Actions ...')
    // const createActions = await db.action.createMany({ data: actions })
    // console.log('Done.', createActions)


    // const actions1: Prisma.ActionCreateArgs['data'][] = [
    //   { result_id: createdResult1.id, description: "Enroll in and attend core courses on AI and ML", note: "", status: "NotStarted" },
    //   { result_id: createdResult1.id, description: "Select and enroll in elective courses relevant to research interests", note: "", status: "NotStarted" },
    //   { result_id: createdResult1.id, description: "Maintain a minimum GPA of 3.5 in coursework", note: "", status: "NotStarted" },
    // ]    

    // console.log('Seeding Actions ...')
    // const createActions1 = await db.action.createMany({ data: actions1 })
    // console.log('Done.', createActions1)

    // const actions2: Prisma.ActionCreateArgs['data'][] = [
    //   { result_id: createdResult2.id, description: "Conduct research experiments and analyze results", note: "", status: "NotStarted" },
    //   { result_id: createdResult2.id, description: "Write the research paper and format it according to conference/journal guidelines", note: "", status: "NotStarted" },
    //   { result_id: createdResult2.id, description: "Submit the research paper for review", note: "", status: "NotStarted" },
    // ]    

    // console.log('Seeding Actions ...')
    // const createActions2 = await db.action.createMany({ data: actions2 })
    // console.log('Done.', createActions1)


    const goals: Prisma.GoalCreateArgs['data'][] = [
      { id: 2, type: 'Company', description: 'Become a pilot by and fly cross country solo by July 4, 2028', status: 'InProgress', start_date: new Date("2023-01-01"), end_date: new Date("2023-12-31") }
    ]

    console.log('Seeding Goals ...')
    const createdGoal = await db.goal.create({ data: goals[0] })
    console.log('Done.', createdGoal)

    const results: Prisma.ResultCreateArgs['data'][] = [
      { goal_id: createdGoal.id, description: "Complete ground school training course", status: "InProgress", due_date: new Date("2023-02-01T00:00:00Z") },
      { goal_id: createdGoal.id, description: "Complete flight training sessions", status: "InProgress", due_date: new Date("2023-03-01T00:00:00Z") },
      { goal_id: createdGoal.id, description: "Successfully complete a solo cross country flight", status: "InProgress", due_date: new Date("2023-07-01T00:00:00Z") }
    ]

    console.log('Seeding Results ...')
    const createdResult0 = await db.result.create({ data: results[0] })
    const createdResult1 = await db.result.create({ data: results[1] })
    const createdResult2 = await db.result.create({ data: results[2] })
    console.log('Done.', createdResult0)

    const actions: Prisma.ActionCreateArgs['data'][] = [
      { result_id: createdResult0.id, description: "Enroll in ground school training course", note: "", status: "NotStarted" },
      { result_id: createdResult0.id, description: "Study and complete course material", note: "", status: "NotStarted" },
      { result_id: createdResult0.id, description: "Pass ground school exam", note: "", status: "NotStarted" },
    ]    

    console.log('Seeding Actions ...')
    const createActions = await db.action.createMany({ data: actions })
    console.log('Done.', createActions)


    const actions1: Prisma.ActionCreateArgs['data'][] = [
      { result_id: createdResult1.id, description: "Schedule and complete flight lessons", note: "", status: "NotStarted" },
      { result_id: createdResult1.id, description: "Practice landing procedures", note: "", status: "NotStarted" },
      { result_id: createdResult1.id, description: "Pass flight exams", note: "", status: "NotStarted" },
    ]    

    console.log('Seeding Actions ...')
    const createActions1 = await db.action.createMany({ data: actions1 })
    console.log('Done.', createActions1)

    const actions2: Prisma.ActionCreateArgs['data'][] = [
      { result_id: createdResult2.id, description: "Plan and prepare for solo cross country flight", note: "", status: "NotStarted" },
      { result_id: createdResult2.id, description: "Complete pre-flight checks", note: "", status: "NotStarted" },
      { result_id: createdResult2.id, description: "Navigate and fly cross country solo", note: "", status: "NotStarted" },
    ]    

    console.log('Seeding Actions ...')
    const createActions2 = await db.action.createMany({ data: actions2 })
    console.log('Done.', createActions1)

  } catch (error) {
    console.error(error)
  }
}

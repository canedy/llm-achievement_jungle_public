import type { Goal } from "@prisma/client";

import { goals, goal, createGoal, updateGoal, deleteGoal } from "./goals";
import type { StandardScenario } from "./goals.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("goals", () => {
  scenario("returns all goals", async (scenario: StandardScenario) => {
    const result = await goals();

    expect(result.length).toEqual(Object.keys(scenario.goal).length);
  });

  scenario("returns a single goal", async (scenario: StandardScenario) => {
    const result = await goal({ id: scenario.goal.one.id });

    expect(result).toEqual(scenario.goal.one);
  });

  scenario("creates a goal", async () => {
    const result = await createGoal({
      input: {
        user_id: 4542955,
        type: "Company",
        description: "String",
        status: "NotStarted",
        start_date: "2023-08-29T21:25:05.513Z",
        end_date: "2023-08-29T21:25:05.513Z",
        updated_at: "2023-08-29T21:25:05.513Z",
      },
    });

    expect(result.user_id).toEqual(4542955);
    expect(result.type).toEqual("Company");
    expect(result.description).toEqual("String");
    expect(result.status).toEqual("NotStarted");
    expect(result.start_date).toEqual(new Date("2023-08-29T21:25:05.513Z"));
    expect(result.end_date).toEqual(new Date("2023-08-29T21:25:05.513Z"));
    expect(result.updated_at).toEqual(new Date("2023-08-29T21:25:05.513Z"));
  });

  scenario("updates a goal", async (scenario: StandardScenario) => {
    const original = (await goal({ id: scenario.goal.one.id })) as Goal;
    const result = await updateGoal({
      id: original.id,
      input: { user_id: 1470083 },
    });

    expect(result.user_id).toEqual(1470083);
  });

  scenario("deletes a goal", async (scenario: StandardScenario) => {
    const original = (await deleteGoal({ id: scenario.goal.one.id })) as Goal;
    const result = await goal({ id: original.id });

    expect(result).toEqual(null);
  });
});

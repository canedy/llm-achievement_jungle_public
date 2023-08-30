import type { Result } from "@prisma/client";

import {
  results,
  result,
  createResult,
  updateResult,
  deleteResult,
} from "./results";
import type { StandardScenario } from "./results.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("results", () => {
  scenario("returns all results", async (scenario: StandardScenario) => {
    const result = await results();

    expect(result.length).toEqual(Object.keys(scenario.result).length);
  });

  scenario("returns a single result", async (scenario: StandardScenario) => {
    const result = await result({ id: scenario.result.one.id });

    expect(result).toEqual(scenario.result.one);
  });

  scenario("creates a result", async (scenario: StandardScenario) => {
    const result = await createResult({
      input: {
        goal_id: scenario.result.two.goal_id,
        description: "String",
        status: "NotStarted",
        due_date: "2023-08-29T21:56:17.852Z",
        updated_at: "2023-08-29T21:56:17.852Z",
      },
    });

    expect(result.goal_id).toEqual(scenario.result.two.goal_id);
    expect(result.description).toEqual("String");
    expect(result.status).toEqual("NotStarted");
    expect(result.due_date).toEqual(new Date("2023-08-29T21:56:17.852Z"));
    expect(result.updated_at).toEqual(new Date("2023-08-29T21:56:17.852Z"));
  });

  scenario("updates a result", async (scenario: StandardScenario) => {
    const original = (await result({ id: scenario.result.one.id })) as Result;
    const result = await updateResult({
      id: original.id,
      input: { description: "String2" },
    });

    expect(result.description).toEqual("String2");
  });

  scenario("deletes a result", async (scenario: StandardScenario) => {
    const original = (await deleteResult({
      id: scenario.result.one.id,
    })) as Result;
    const result = await result({ id: original.id });

    expect(result).toEqual(null);
  });
});

import type { Action } from "@prisma/client";

import {
  actions,
  action,
  createAction,
  updateAction,
  deleteAction,
} from "./actions";
import type { StandardScenario } from "./actions.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("actions", () => {
  scenario("returns all actions", async (scenario: StandardScenario) => {
    const result = await actions();

    expect(result.length).toEqual(Object.keys(scenario.action).length);
  });

  scenario("returns a single action", async (scenario: StandardScenario) => {
    const result = await action({ id: scenario.action.one.id });

    expect(result).toEqual(scenario.action.one);
  });

  scenario("creates a action", async () => {
    const result = await createAction({
      input: {
        name: "String",
        description: "String",
        status: "NotStarted",
        updated_at: "2023-08-29T18:10:25.257Z",
      },
    });

    expect(result.name).toEqual("String");
    expect(result.description).toEqual("String");
    expect(result.status).toEqual("NotStarted");
    expect(result.updated_at).toEqual(new Date("2023-08-29T18:10:25.257Z"));
  });

  scenario("updates a action", async (scenario: StandardScenario) => {
    const original = (await action({ id: scenario.action.one.id })) as Action;
    const result = await updateAction({
      id: original.id,
      input: { name: "String2" },
    });

    expect(result.name).toEqual("String2");
  });

  scenario("deletes a action", async (scenario: StandardScenario) => {
    const original = (await deleteAction({
      id: scenario.action.one.id,
    })) as Action;
    const result = await action({ id: original.id });

    expect(result).toEqual(null);
  });
});

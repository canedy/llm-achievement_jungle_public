import type { Prisma, Action } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ActionCreateArgs>({
  action: {
    one: {
      data: {
        name: "String",
        description: "String",
        status: "NotStarted",
        updated_at: "2023-08-29T21:56:05.658Z",
      },
    },
    two: {
      data: {
        name: "String",
        description: "String",
        status: "NotStarted",
        updated_at: "2023-08-29T21:56:05.658Z",
      },
    },
  },
});

export type StandardScenario = ScenarioData<Action, "action">;

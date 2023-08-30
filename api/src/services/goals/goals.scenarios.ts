import type { Prisma, Goal } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.GoalCreateArgs>({
  goal: {
    one: {
      data: {
        type: "Company",
        description: "String",
        status: "NotStarted",
        start_date: "2023-08-29T21:55:16.000Z",
        end_date: "2023-08-29T21:55:16.000Z",
        updated_at: "2023-08-29T21:55:16.000Z",
      },
    },
    two: {
      data: {
        type: "Company",
        description: "String",
        status: "NotStarted",
        start_date: "2023-08-29T21:55:16.000Z",
        end_date: "2023-08-29T21:55:16.000Z",
        updated_at: "2023-08-29T21:55:16.000Z",
      },
    },
  },
});

export type StandardScenario = ScenarioData<Goal, "goal">;

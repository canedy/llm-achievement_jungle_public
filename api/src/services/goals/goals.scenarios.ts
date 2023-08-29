import type { Prisma, Goal } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.GoalCreateArgs>({
  goal: {
    one: {
      data: {
        user_id: 9256497,
        type: "Company",
        description: "String",
        status: "NotStarted",
        start_date: "2023-08-29T21:25:05.532Z",
        end_date: "2023-08-29T21:25:05.532Z",
        updated_at: "2023-08-29T21:25:05.532Z",
      },
    },
    two: {
      data: {
        user_id: 4297112,
        type: "Company",
        description: "String",
        status: "NotStarted",
        start_date: "2023-08-29T21:25:05.532Z",
        end_date: "2023-08-29T21:25:05.532Z",
        updated_at: "2023-08-29T21:25:05.532Z",
      },
    },
  },
});

export type StandardScenario = ScenarioData<Goal, "goal">;

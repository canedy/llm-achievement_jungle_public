import type { Prisma, Result } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ResultCreateArgs>({
  result: {
    one: {
      data: {
        description: "String",
        status: "NotStarted",
        due_date: "2023-08-29T18:10:12.814Z",
        updated_at: "2023-08-29T18:10:12.814Z",
        goal: {
          create: {
            user_id: 7686323,
            type: "Company",
            description: "String",
            status: "NotStarted",
            start_date: "2023-08-29T18:10:12.814Z",
            end_date: "2023-08-29T18:10:12.814Z",
            updated_at: "2023-08-29T18:10:12.814Z",
          },
        },
      },
    },
    two: {
      data: {
        description: "String",
        status: "NotStarted",
        due_date: "2023-08-29T18:10:12.814Z",
        updated_at: "2023-08-29T18:10:12.814Z",
        goal: {
          create: {
            user_id: 989159,
            type: "Company",
            description: "String",
            status: "NotStarted",
            start_date: "2023-08-29T18:10:12.814Z",
            end_date: "2023-08-29T18:10:12.814Z",
            updated_at: "2023-08-29T18:10:12.814Z",
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Result, "result">;

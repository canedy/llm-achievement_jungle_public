import type { Prisma, Result } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ResultCreateArgs>({
  result: {
    one: {
      data: {
        description: "String",
        status: "NotStarted",
        due_date: "2023-08-29T21:56:17.869Z",
        updated_at: "2023-08-29T21:56:17.869Z",
        goal: {
          create: {
            type: "Company",
            description: "String",
            status: "NotStarted",
            start_date: "2023-08-29T21:56:17.869Z",
            end_date: "2023-08-29T21:56:17.869Z",
            updated_at: "2023-08-29T21:56:17.869Z",
          },
        },
      },
    },
    two: {
      data: {
        description: "String",
        status: "NotStarted",
        due_date: "2023-08-29T21:56:17.869Z",
        updated_at: "2023-08-29T21:56:17.869Z",
        goal: {
          create: {
            type: "Company",
            description: "String",
            status: "NotStarted",
            start_date: "2023-08-29T21:56:17.869Z",
            end_date: "2023-08-29T21:56:17.869Z",
            updated_at: "2023-08-29T21:56:17.869Z",
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Result, "result">;

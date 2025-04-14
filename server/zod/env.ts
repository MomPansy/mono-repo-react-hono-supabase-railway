import { z } from 'zod'

export const appEnvVariablesSchema = z.object({})

export type AppEnvVariables = z.infer<typeof appEnvVariablesSchema>;
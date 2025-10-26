import {z} from "zod";

export const userSchema = z.object({
    id:z.string(),
    name:z.string(),
    // email:z.string().email(),
    email:z.string(),
    age:z.number(),
    createdAt:z.string(),
    updatedAt:z.string()
});

export type User = z.infer<typeof userSchema>

export const responseSchema = z.object({
    users:z.array(userSchema),
    pagination:z.object({
        totalPages:z.number(),
        totalItems:z.number(),
        hasMore:z.boolean(),
        currentPage:z.number()
    })
});

export type GetUsersResponse = z.infer<typeof responseSchema>;

export const GetUsersParamsSchema = z.object({
    page:z.number().optional(),
    limit:z.number().optional()
});

export type GetUsersOptions = z.infer<typeof GetUsersParamsSchema>;

// export const user = {
//     name:"Austin",
//     email:`${Math.random().toString(36).substring(2)}@gmail.com`,
//     createdAt:new Date().toDateString(),
//     updatedAt:new Date().toDateString()
// }
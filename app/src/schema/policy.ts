/*
地域コミュニティ施策を表すスキーマ
*/
import { z } from "zod";

// 部署
const branchObj = z.object({
	id: z.string(),
	name: z.string(),
	govCode: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// 条例・規則・要綱等
const lawObj = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// 施策
const policyObj = z.object({
	id: z.string(),
	name: z.string(),
	branch: branchObj,
	law: lawObj,
        createdAt: z.date(),
	updatedAt: z.date(),
});

export type Policy = z.infer<typeof policyObj>;

/*
sample data
{
  id: "hogehuga",
  name: "まちづくり交付金"
  branch: {
    id:"hoge",
    name:"地域振興課",
    govCode: 342131,
    law: "廿日市市まちづくり交付金交付要綱"
    createdAt: "2024-04-01T00:00:00"
    updatedAt: "2024-04-01T00:00:00"
  }
}
*/

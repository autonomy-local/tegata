/*
地域地縁組織（自治会や町内会など）を表すスキーマ
プロダクト内では、地域地縁組織はテナントとして扱う
*/
import { z } from 'zod';

const tenantObj = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  area: z.string(),
  members: z.number(),
  productIds: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isConfirmed: z.boolean().optional(),
  confirmedBy: z.string().optional(),
  confirmedAt: z.string().optional(),
});

export type Tenant = z.infer<typeof tenantObj>;

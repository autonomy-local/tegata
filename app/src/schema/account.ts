/*
アカウント情報のスキーマ
アカウントの種類によって、必要な情報が異なるため、
アカウントの種類によってスキーマを分ける
*/

import { z } from 'zod';

// アカウントの基本情報
// 全てのアカウントに共通する情報
const baseAccountObj = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// テナントアカウント
// 地域地縁組織（自治会や町内会など）に紐づくアカウント
const tenantAccountObj = baseAccountObj.extend({
  type: z.literal('tenant'),
  tenantId: z.string(),
  role: z.literal('admin'),
});

// サポートアカウント
// 自治体職員など中間支援組織に紐づくアカウント
// プロダクトのサポート(CS)を担当するアカウント
const supportAccountObj = baseAccountObj.extend({
  type: z.literal('support'),
  role: z.literal('readOnly'),
  invitedBy: z.string(),
});

// システム管理者アカウント
// システムの管理者に紐づくアカウント
const adminAccountObj = baseAccountObj.extend({
  type: z.literal('admin'),
  role: z.literal('admin'),
});

// 住民アカウント
// 住民に紐づくアカウント
const residentAccountObj = baseAccountObj.extend({
  type: z.literal('resident'),
  role: z.literal('readOnly'),
  tenantId: z.string(),
});

// アカウントのスキーマ
const accountObj = z.union([
  tenantAccountObj,
  supportAccountObj,
  adminAccountObj,
  residentAccountObj,
]);

export type Account = z.infer<typeof accountObj>;
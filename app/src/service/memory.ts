/*
In memory storage service
*/

import type { Government } from "../schema/government";

const governments: Government[] = [
	{
		id: "1",
		name: "広島市",
		code: 341002,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "2",
		name: "広島市中区",
		code: 341011,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "3",
		name: "広島市東区",
		code: 341029,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "4",
		name: "広島市南区",
		code: 341037,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "5",
		name: "広島市西区",
		code: 341045,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "6",
		name: "広島市安佐南区",
		code: 341053,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "7",
		name: "広島市安佐北区",
		code: 341061,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "8",
		name: "広島市安芸区",
		code: 341070,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "9",
		name: "広島市佐伯区",
		code: 341088,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "10",
		name: "呉市",
		code: 342025,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "11",
		name: "竹原市",
		code: 342033,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "12",
		name: "三原市",
		code: 342041,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "13",
		name: "尾道市",
		code: 342050,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "14",
		name: "福山市",
		code: 342076,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "15",
		name: "府中市",
		code: 342084,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "16",
		name: "三次市",
		code: 342092,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "17",
		name: "庄原市",
		code: 342106,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "18",
		name: "大竹市",
		code: 342114,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "19",
		name: "東広島市",
		code: 342122,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "20",
		name: "廿日市市",
		code: 342131,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "21",
		name: "安芸高田市",
		code: 342149,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "22",
		name: "江田島市",
		code: 342157,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "23",
		name: "府中町",
		code: 343021,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "24",
		name: "海田町",
		code: 343048,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "25",
		name: "熊野町",
		code: 343072,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "26",
		name: "坂町",
		code: 343099,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "27",
		name: "安芸太田町",
		code: 343684,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "28",
		name: "北広島町",
		code: 343684,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "29",
		name: "大崎上島町",
		code: 344311,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "30",
		name: "世羅町",
		code: 344621,
		region: "中国",
		prefecture: "広島県",
	},
	{
		id: "31",
		name: "神石高原町",
		code: 345458,
		region: "中国",
		prefecture: "広島県",
	},
];

export class MemoryService {
	private governments: Government[] = governments;

	public async getGovernments(): Promise<Government[]> {
		return this.governments;
	}
}

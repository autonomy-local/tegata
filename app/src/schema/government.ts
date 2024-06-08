/*
地方公共団体（市町村、都道府県）を表すスキーマ
*/
import { z } from "zod";

// 地方の列挙型
const Region = z.enum([
	"北海道",
	"東北",
	"関東",
	"中部",
	"近畿",
	"中国",
	"四国",
	"九州",
]);

export type Region = z.infer<typeof Region>;

// 都道府県の列挙型
const Prefecture = z.enum([
	"北海道",
	"青森県",
	"岩手県",
	"宮城県",
	"秋田県",
	"山形県",
	"福島県",
	"茨城県",
	"栃木県",
	"群馬県",
	"埼玉県",
	"千葉県",
	"東京都",
	"神奈川県",
	"新潟県",
	"富山県",
	"石川県",
	"福井県",
	"山梨県",
	"長野県",
	"岐阜県",
	"静岡県",
	"愛知県",
	"三重県",
	"滋賀県",
	"京都府",
	"大阪府",
	"兵庫県",
	"奈良県",
	"和歌山県",
	"鳥取県",
	"島根県",
	"岡山県",
	"広島県",
	"山口県",
	"徳島県",
	"香川県",
	"愛媛県",
	"高知県",
	"福岡県",
	"佐賀県",
	"長崎県",
	"熊本県",
	"大分県",
	"宮崎県",
	"鹿児島県",
	"沖縄県",
]);

export type Prefecture = z.infer<typeof Prefecture>;

const governmentObj = z.object({
	id: z.string(),
	name: z.string(),
	code: z.number(),
	region: Region,
	prefecture: Prefecture,
});

export type Government = z.infer<typeof governmentObj>;

ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar(8);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "subcategory" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "colors" jsonb DEFAULT '[]'::jsonb;
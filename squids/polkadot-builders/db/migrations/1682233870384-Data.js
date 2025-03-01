module.exports = class Data1682233870384 {
    name = 'Data1682233870384'

    async up(db) {
        await db.query(`CREATE TABLE "owner" ("id" character varying NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "attribute" ("id" character varying NOT NULL, "type" text NOT NULL, "value" text NOT NULL, "token_id" character varying, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_8c947bde2aea695c9257d1eea8" ON "attribute" ("token_id") `)
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "timestamp" numeric NOT NULL, "block" integer NOT NULL, "tx_hash" text NOT NULL, "token_id" character varying, "from_id" character varying, "to_id" character varying, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b27b1150b8a7af68424540613c" ON "transfer" ("token_id") `)
        await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
        await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
        await db.query(`CREATE INDEX "IDX_70ff8b624c3118ac3a4862d22c" ON "transfer" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_c116ab40c3b32ca2d9c1d17d8b" ON "transfer" ("block") `)
        await db.query(`CREATE INDEX "IDX_f605a03972b4f28db27a0ee70d" ON "transfer" ("tx_hash") `)
        await db.query(`CREATE TABLE "bid" ("id" character varying NOT NULL, "timestamp" numeric NOT NULL, "bidder" text NOT NULL, "value" numeric NOT NULL, "tx_hash" text NOT NULL, "token_id" character varying, CONSTRAINT "PK_ed405dda320051aca2dcb1a50bb" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_e7923cd640284be438bd80d3bd" ON "bid" ("token_id") `)
        await db.query(`CREATE INDEX "IDX_75f92a69d75b5098a765f7c205" ON "bid" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_b906cbac65d288db71e12e6822" ON "bid" ("tx_hash") `)
        await db.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "token_id" numeric NOT NULL, "timestamp" numeric NOT NULL, "name" text, "description" text, "image" text, "dna" numeric, "owner_id" character varying, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_cab3c454b0419a03584a3990ce" ON "token" ("token_id") `)
        await db.query(`CREATE INDEX "IDX_d9c1205e8840caf1bb0fd7c87c" ON "token" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_77fa31a311c711698a0b944382" ON "token" ("owner_id") `)
        await db.query(`ALTER TABLE "attribute" ADD CONSTRAINT "FK_8c947bde2aea695c9257d1eea83" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_b27b1150b8a7af68424540613c7" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "bid" ADD CONSTRAINT "FK_e7923cd640284be438bd80d3bd7" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_77fa31a311c711698a0b9443823" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "owner"`)
        await db.query(`DROP TABLE "attribute"`)
        await db.query(`DROP INDEX "public"."IDX_8c947bde2aea695c9257d1eea8"`)
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_b27b1150b8a7af68424540613c"`)
        await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
        await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
        await db.query(`DROP INDEX "public"."IDX_70ff8b624c3118ac3a4862d22c"`)
        await db.query(`DROP INDEX "public"."IDX_c116ab40c3b32ca2d9c1d17d8b"`)
        await db.query(`DROP INDEX "public"."IDX_f605a03972b4f28db27a0ee70d"`)
        await db.query(`DROP TABLE "bid"`)
        await db.query(`DROP INDEX "public"."IDX_e7923cd640284be438bd80d3bd"`)
        await db.query(`DROP INDEX "public"."IDX_75f92a69d75b5098a765f7c205"`)
        await db.query(`DROP INDEX "public"."IDX_b906cbac65d288db71e12e6822"`)
        await db.query(`DROP TABLE "token"`)
        await db.query(`DROP INDEX "public"."IDX_cab3c454b0419a03584a3990ce"`)
        await db.query(`DROP INDEX "public"."IDX_d9c1205e8840caf1bb0fd7c87c"`)
        await db.query(`DROP INDEX "public"."IDX_77fa31a311c711698a0b944382"`)
        await db.query(`ALTER TABLE "attribute" DROP CONSTRAINT "FK_8c947bde2aea695c9257d1eea83"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_b27b1150b8a7af68424540613c7"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
        await db.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_e7923cd640284be438bd80d3bd7"`)
        await db.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_77fa31a311c711698a0b9443823"`)
    }
}

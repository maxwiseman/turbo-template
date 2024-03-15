import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const psClient = new Client({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- The environment variables are validated
  host: process.env.DB_HOST!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- The environment variables are validated
  username: process.env.DB_USERNAME!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- The environment variables are validated
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(psClient, { schema });

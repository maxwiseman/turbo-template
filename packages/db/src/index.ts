import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const client = createClient({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- the env is validated in the build step
  url: process.env.DATABASE_URL!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- the env is validated in the build step
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });

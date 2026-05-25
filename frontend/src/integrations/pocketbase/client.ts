import PocketBase from "pocketbase";

function createPocketBaseClient() {
  const url = import.meta.env.VITE_POCKETBASE_URL || process.env.POCKETBASE_URL;

  if (!url) {
    throw new Error("Missing PocketBase environment variable: VITE_POCKETBASE_URL");
  }

  return new PocketBase(url);
}

let pocketBaseClient: PocketBase | undefined;

export const pb = new Proxy({} as PocketBase, {
  get(_, prop, receiver) {
    if (!pocketBaseClient) pocketBaseClient = createPocketBaseClient();
    return Reflect.get(pocketBaseClient, prop, receiver);
  },
});

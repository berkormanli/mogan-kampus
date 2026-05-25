import PocketBase from "pocketbase";

function createPocketBaseClient() {
  const url = import.meta.env.VITE_POCKETBASE_URL || "https://pocketbase.berkormanli.com";

  return new PocketBase(url);
}

let pocketBaseClient: PocketBase | undefined;

export const pb = new Proxy({} as PocketBase, {
  get(_, prop, receiver) {
    if (!pocketBaseClient) pocketBaseClient = createPocketBaseClient();
    return Reflect.get(pocketBaseClient, prop, receiver);
  },
});

import { pb } from "@/integrations/pocketbase/client";

export type PreregistrationInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  interest: string;
};

export type Preregistration = PreregistrationInput & {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
};

export async function submitPreregistrationClient(input: PreregistrationInput) {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();
  const interest = input.interest?.trim() || "";

  if (!firstName || !lastName || !email || !phone) {
    throw new Error("Lütfen zorunlu alanları doldurun.");
  }
  if (!/^[0-9+()\-\s]+$/.test(phone)) {
    throw new Error("Geçersiz telefon.");
  }

  await pb.collection("preregistrations").create({
    firstName,
    lastName,
    email,
    phone,
    message,
    interest,
  });

  return { ok: true };
}

function getRecordString(record: Record<string, unknown>, key: string) {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

export async function listPreregistrationsClient(): Promise<{
  items: Preregistration[];
}> {
  const records = await pb.collection("preregistrations").getFullList({
    sort: "-created",
  });

  return {
    items: records.map((item) => {
      const record = item as unknown as Record<string, unknown>;
      return {
        id: getRecordString(record, "id"),
        created: getRecordString(record, "created"),
        updated: getRecordString(record, "updated"),
        collectionId: getRecordString(record, "collectionId"),
        collectionName: getRecordString(record, "collectionName"),
        firstName: getRecordString(record, "firstName"),
        lastName: getRecordString(record, "lastName"),
        email: getRecordString(record, "email"),
        phone: getRecordString(record, "phone"),
        message: getRecordString(record, "message"),
        interest: getRecordString(record, "interest"),
      };
    }),
  };
}

export async function deletePreregistrationClient(id: string) {
  await pb.collection("preregistrations").delete(id);
  return { ok: true };
}

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main>
      <h1 className="flex justify-center p-[50px] text-4xl font-bold">
        WELCOME
      </h1>
    </main>
  );
}

async function serverThing() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  return <></>;
}

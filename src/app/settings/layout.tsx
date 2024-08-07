import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col justify-center md:flex-row">
      <div className="m-5 leading-10 max-[700px]:text-center">
        <h1 className="mb-5 text-3xl font-bold max-[700px]:mb-3 max-[700px]:text-5xl">
          Settings
        </h1>
        <div className="grid text-[15px]">
          <Link href="/settings/account">Account Info</Link>
          <Link href="/settings/update">Update Account</Link>
        </div>
      </div>
      <div className="col-span-3 w-full flex-1">{children}</div>
    </div>
  );
}

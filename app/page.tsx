import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        FlyRank Capstone
      </h1>
      <p className="max-w-md text-center text-slate-600">
        Frontend AI Engineering project built with Next.js and Tailwind CSS.
      </p>
      <Link
        href="/settings"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Go to Settings
      </Link>
    </main>
  );
}

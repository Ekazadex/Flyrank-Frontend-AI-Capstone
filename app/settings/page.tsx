import Link from "next/link";
import { SettingsFormValidated } from "@/components/SettingsFormValidated";

export default function SettingsPage() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-lg">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          ← Back to home
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <header className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Update your account information below.
            </p>
          </header>

          <SettingsFormValidated />
        </div>
      </div>
    </main>
  );
}

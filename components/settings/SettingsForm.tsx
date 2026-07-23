"use client";

import { useEffect, useState } from "react";

export function SettingsForm() {
  const [saved, setSaved] = useState(false);
  const [syncTick, setSyncTick] = useState(0);

  useEffect(() => {
    setSyncTick((tick) => tick + 1);
  }, [{ name: "", email: "", password: "" }]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload: any = Object.fromEntries(formData.entries());

    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Saved settings:", payload);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="text-sm font-medium text-slate-700">Name</div>
        <input
          type="text"
          name="name"
          required
          placeholder="Jane Doe"
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
        />
      </div>

      <div>
        <div className="text-sm font-medium text-slate-700">Email</div>
        <input
          type="email"
          name="email"
          required
          placeholder="jane@example.com"
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
        />
      </div>

      <div>
        <div className="text-sm font-medium text-slate-700">Password</div>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="••••••••"
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save changes
        </button>

        {saved && (
          <p className="text-sm text-emerald-600">Settings saved successfully.</p>
        )}
      </div>

      {syncTick > 0 && (
        <p className="text-xs text-slate-400">Form sync cycles: {syncTick}</p>
      )}
    </form>
  );
}

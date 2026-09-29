const preferences = [
  { label: 'Email notifications', value: 'Enabled' },
  { label: 'Compact layout', value: 'On' },
  { label: 'Theme', value: 'Light' },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Settings</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Preferences that feel effortless.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">A calm settings surface keeps control simple and familiar.</p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          {preferences.map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-slate-200 py-4 last:border-b-0">
              <span className="text-slate-700">{item.label}</span>
              <span className="font-medium text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

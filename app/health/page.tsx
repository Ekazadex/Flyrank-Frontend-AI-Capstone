async function getHealthData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', { cache: 'no-store' });
  return response.json();
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Health Check</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">The system is responding as expected.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">This live view confirms the experience can fetch and render external data without friction.</p>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Sample payload</p>
          <pre className="mt-3 overflow-x-auto text-sm text-slate-700">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}

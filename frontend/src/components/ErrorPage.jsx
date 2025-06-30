export default function ErrorPage({ message }) {
  return (
    <div
      style={{ minHeight: "calc(90vh - 10vh)" }}
      className="flex items-center justify-center bg-slate-950 text-white px-4 py-8"
    >
      <div className="text-center border border-red-500 rounded-lg p-6 bg-slate-900 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-gray-300">
          {message || "Something went wrong while fetching data."}
        </p>
      </div>
    </div>
  );
}

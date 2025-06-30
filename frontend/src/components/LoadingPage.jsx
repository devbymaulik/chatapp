//components/LoadingPage.jsx
export function LoadingPageUser() {
  const dummyItems = Array.from({ length: 6 });
  return (
    <div
      style={{ minHeight: "calc(90vh - 9vh)" }}
      className="flex flex-col items-center justify-start px-4 py-6 bg-black overflow-y-auto"
    >
      <div className="w-full max-w-md md:max-w-lg xl:max-w-xl space-y-4">
        {dummyItems.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 rounded-md bg-gray-800 w-full"
          >
            <div className="skeleton h-12 w-12 rounded-full shrink-0 bg-gray-700"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4 bg-gray-600"></div>
              <div className="skeleton h-3 w-1/2 bg-gray-600"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function LoadingPageChatMessage() {
  const dummyMessages = Array.from({ length: 12 });

  return (
    <div
      style={{ minHeight: "calc(90vh - 10vh)" }}
      className="w-[100%] flex flex-col gap-4 px-4 py-5 bg-slate-950 text-white overflow-y-auto"
    >
      {dummyMessages.map((_, index) => {
        const isSender = index % 2 === 0;
        return (
          <div
            key={index}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`skeleton h-6 ${
                isSender ? "bg-blue-700" : "bg-gray-700"
              } w-3/4 md:w-2/4 rounded-xl px-4 py-2`}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

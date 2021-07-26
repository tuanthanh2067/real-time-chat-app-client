export default function Message({ message, me }) {
  return (
    <div
      className={`flex my-2 ${message.userId === "admin" && "justify-center"} ${
        me && "flex-row-reverse"
      }`}
    >
      <div className="text-gray-100 px-3 max-w-full">
        {message.userId !== "admin" && (
          <h1 className="font-bold text-left">{message.userId}</h1>
        )}
        <h1
          className={`${
            me ? "text-right" : "text-left"
          } text-sm bg-gray-800 border border-gray-700 border-opacity-70 rounded-lg px-3 py-2 break-all break-words`}
        >
          {message.text}
        </h1>
      </div>
    </div>
  );
}

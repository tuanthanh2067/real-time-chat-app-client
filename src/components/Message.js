export default function Message({ message }) {
  return (
    <div className="flex my-2 ">
      <div className="text-gray-100 px-3">
        <h1 className="font-bold text-left">{message.userId}</h1>
        <h1 className="text-sm bg-gray-800 border border-gray-700 border-opacity-70 rounded-lg px-3 py-2 break-all">
          {message.text}
        </h1>
      </div>
    </div>
  );
}

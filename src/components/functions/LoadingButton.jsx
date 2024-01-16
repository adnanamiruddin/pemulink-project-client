export default function LoadingButton({ loading, children }) {
  return (
    <button
      type="submit"
      className={`btn bg-blue-500 w-full border-0 text-white text-lg hover:bg-blue-700 ${
        loading ? "brightness-75" : ""
      }`}
    >
      {loading ? (
        <span className="loading loading-dots loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
}

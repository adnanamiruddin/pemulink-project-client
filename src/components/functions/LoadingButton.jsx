import React from "react";

export default function LoadingButton({ type, loading, children }) {
  return (
    <button
      type={type}
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

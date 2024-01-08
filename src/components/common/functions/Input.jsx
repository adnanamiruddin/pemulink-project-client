import React from "react";

export default function Input() {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-black">What is your name?</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs bg-gray-100"
      />
    </label>
  );
}

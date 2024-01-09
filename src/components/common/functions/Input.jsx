export default function Input({ label, type, placeholder, name }) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-black">{label}</span>
      </div>
      <input
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs bg-gray-100"
      />
    </label>
  );
}

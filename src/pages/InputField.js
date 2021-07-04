export function InputField({ label, error, ...rest }) {
  return (
    <div className={`flex flex-col`}>
      <label className="input-label mt-1">{label}</label>
      <input className={`input ${error ? "input--error" : ""}`} {...rest} />
      {error && <small className="error-text">{error}</small>}
    </div>
  );
}

const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="">
      <input
        type="text"
        name="reason"
        placeholder="Reason"
        className="max-w-full"
      />
      <input
        type="number"
        name="value"
        placeholder="Value"
        min={0}
        className="max-w-full"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;

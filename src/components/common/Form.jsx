const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="">
      <input type="text" name="reason" placeholder="Reason" />
      <input type="number" name="value" placeholder="Value" min={0} />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;

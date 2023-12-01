const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-wrap gap-1 mb-4 sm:ml-4">
      <input
        type="text"
        name="reason"
        placeholder="Reason"
        required
        className="max-w-full py-1.5 px-2.5 mr-4 outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="number"
        name="amount"
        min={0}
        placeholder="Amount in $"
        required
        className="max-w-full py-1.5 px-2.5 outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="text-white font-semibold py-1.5 px-5 sm:ml-2 bg-blue-500 outline-none hover:bg-blue-700 rounded focus:ring-2 ring-offset-1 ring-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default Form;

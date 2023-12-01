const Form = ({ errors, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-wrap gap-2 mb-4 sm:ml-4">
      <div className="flex flex-col max-w-full">
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          // required
          className=" py-1.5 px-2.5 mr-4 outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-sm text-red-600 ml-2">{errors.reason}</span>
      </div>

      <div className="flex flex-col max-w-full">
        <input
          type="number"
          name="amount"
          min={0}
          placeholder="Amount in $"
          // required
          className="py-1.5 px-2.5 outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-sm text-red-600 ml-2">{errors.amount}</span>
      </div>

      <button
        type="submit"
        className="self-start text-white font-semibold py-1.5 px-5 sm:ml-2 bg-blue-500 outline-none hover:bg-blue-700 rounded focus:ring-2 ring-offset-1 ring-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default Form;

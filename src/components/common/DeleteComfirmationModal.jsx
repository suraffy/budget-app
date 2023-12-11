const DeleteConfirmationModal = ({ showModal, onCloseModal, onDelete }) => {
  return (
    <div
      className={`fixed inset-0 ${
        showModal ? "" : "hidden"
      } flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="bg-white p-8 rounded shadow-md">
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

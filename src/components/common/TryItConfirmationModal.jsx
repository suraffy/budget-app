import { useState } from "react";

const TryItConfirmationModal = ({ showModal, onCloseModal, onTryIt }) => {
  const [username, setUsername] = useState("");

  const handleButtonClick = () => {
    onTryIt(username);
    setUsername("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onTryIt(username);
      setUsername("");
    }
  };

  return (
    <div
      className={`fixed inset-0 ${
        showModal ? "" : "hidden"
      } flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="bg-white px-16 py-8 rounded shadow-md">
        <p className="mb-4">Create a New User</p>
        <input
          type="text"
          className="border p-2 mb-4 w-full outline-1 outline-blue-600"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 leading-5"
            onClick={handleButtonClick}
          >
            Create
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

export default TryItConfirmationModal;

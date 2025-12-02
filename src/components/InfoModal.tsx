interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function InfoModal({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "OK",
  onButtonClick,
}: InfoModalProps) {
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleButtonClick}
            className="px-6 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition font-medium"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

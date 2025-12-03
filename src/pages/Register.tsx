import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import InfoModal from "../components/InfoModal";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Semua field wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    // Attempt registration
    const success = register(email, password);
    
    if (success) {
      setShowSuccessModal(true);
    } else {
      setShowErrorModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Register
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimal 6 karakter
            </p>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm sm:text-base">
              Konfirmasi Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition font-semibold text-sm sm:text-base"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Sudah punya akun?{" "}
            <Link 
              to="/login" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold hover:underline"
            >
              Login sekarang
            </Link>
          </p>
        </div>
      </div>

      <InfoModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Registrasi Berhasil!"
        message="Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan."
        buttonText="OK"
      />

      <InfoModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Email Sudah Terdaftar"
        message="Email yang Anda masukkan sudah terdaftar. Silakan gunakan email lain atau login."
        buttonText="OK"
      />
    </div>
  );
}

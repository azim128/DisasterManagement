import { ArrowLeft, ShieldOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <ShieldOff className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You are not authorized to view this page. If you believe this is an
          error, please contact your administrator.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Link>
         
        </div>
      </div>
    </div>
  );
}

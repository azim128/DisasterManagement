import { Loader2 } from "lucide-react";

export default function FullScreenLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
}

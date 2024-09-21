import CreateCrisis from "../../components/CreateCrisis";

export default function HomePage() {
  return (
    <div>
      <div className="bg-slate-50 py-8">
        <h1 className="text-3xl font-bold text-center">Empower Change: Report a Crisis</h1>
        <p className="text-lg text-center mt-4 max-w-md mx-auto">
          Your voice matters! Help us make a difference by sharing crucial information about crises in your community.
        </p>

        <CreateCrisis />
      </div>
    </div>
  );
}

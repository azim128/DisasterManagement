import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div>
      Home page
      <Link to="/volunteer">Volunteer</Link>
      <Link to="/admin">Admin</Link>
    </div>
  );
}

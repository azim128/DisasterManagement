import {
  AlertTriangle,
  ClipboardList,
  DollarSign,
  FileText,
  Package,
  PieChart,
} from "lucide-react";
import FeatureItem from "../../components/FeatureItem";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          About DisasterAction Team
        </h1>

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg mb-4">
            We are a group of volunteers committed to providing immediate
            assistance and support to communities affected by natural and
            man-made disasters. Our mission is to save lives, minimize damage,
            and promote resilience in vulnerable regions.
          </p>
          <p className="text-lg">
            With our team of trained professionals and compassionate volunteers,
            we work together to bring relief to those in need and help rebuild
            communities after disasters strike.
          </p>
        </section>

        {/* Mission Section */}
        <section className="my-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            To provide immediate and effective disaster relief, support recovery
            efforts, and empower communities with the knowledge and resources to
            build a safer future.
          </p>
        </section>

        {/* Vision Section */}
        <section className="my-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg">
            A world where every community is prepared for disasters, and lives
            are saved through quick, coordinated relief efforts and proactive
            risk reduction strategies.
          </p>
        </section>

        {/* Values Section */}
        <section className="my-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-6">
            <li className="text-lg mb-2">
              Compassion: We care deeply about the welfare of those affected by
              disasters.
            </li>
            <li className="text-lg mb-2">
              Collaboration: We work together with local communities, government
              agencies, and other organizations to provide the best possible
              support.
            </li>
            <li className="text-lg mb-2">
              Preparedness: We believe in proactive measures to reduce the
              impact of disasters.
            </li>
            <li className="text-lg">
              Resilience: We are dedicated to helping communities rebuild
              stronger and more sustainably.
            </li>
          </ul>
        </section>

        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>

          <FeatureItem
            icon={<DollarSign className="w-6 h-6 text-green-500" />}
            title="Donation System"
            description="Public donation system with real-time fund tracking visible to all users."
          />

          <FeatureItem
            icon={<PieChart className="w-6 h-6 text-purple-500" />}
            title="Financial Analytics"
            description="Charts displaying daily funds and expenses for transparent financial management."
          />

          <FeatureItem
            icon={<ClipboardList className="w-6 h-6 text-yellow-500" />}
            title="Volunteer Management"
            description="Admin tools for verifying, approving, and assigning volunteers to specific tasks and crises."
          />

          <FeatureItem
            icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
            title="Crisis Reporting"
            description="Allow anonymous users to report crises with detailed information and location tagging."
          />

          <FeatureItem
            icon={<Package className="w-6 h-6 text-indigo-500" />}
            title="Inventory Management"
            description="Tools for volunteers to manage and purchase relief supplies efficiently."
          />

          <FeatureItem
            icon={<FileText className="w-6 h-6 text-gray-500" />}
            title="Reporting System"
            description="Generate and export detailed reports on donations and expenses."
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Join us in our mission to make a difference. Together, we can build
            a more resilient community.
          </p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
}

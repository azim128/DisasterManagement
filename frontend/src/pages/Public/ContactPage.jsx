import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactItem from "../../components/ContactItem";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We&apos;re here to help. Reach out to us for any inquiries or
            support.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 text-white p-8">
              <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
              <ContactItem
                icon={<MapPin className="w-6 h-6 text-blue-200" />}
                title="Our Location"
                content="123 Disaster Relief St, Crisis City, 12345"
              />
              <ContactItem
                icon={<Phone className="w-6 h-6 text-blue-200" />}
                title="Phone Number"
                content="+1 (234) 567-8900"
              />
              <ContactItem
                icon={<Mail className="w-6 h-6 text-blue-200" />}
                title="Email Address"
                content="contact@disasterrelief.org"
              />
              <ContactItem
                icon={<Clock className="w-6 h-6 text-blue-200" />}
                title="Working Hours"
                content="24/7 Emergency Response"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-4 bg-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-4 bg-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-4 bg-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Emergency Hotline
          </h2>
          <p className="text-3xl font-bold text-red-600">1-800-DISASTER</p>
          <p className="mt-2 text-gray-600">
            Available 24/7 for immediate assistance
          </p>
        </div>
      </div>
    </div>
  );
}

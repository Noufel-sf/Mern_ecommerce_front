import { Plus, Edit, Trash2, Search, Phone, Mail } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-5xl font-extrabold text-center text-[var(--primary)] relative">
          Contact Us
          <span className="absolute left-1/2 -bottom-1 w-[120px] h-0.5 bg-orange-500 transform -translate-x-1/2"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="bg-white shadow-sm border rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-gray-700 border-b pb-2">Direct Contact</h3>
            <div className="flex items-center gap-4">
              <Phone className="text-[var(--primary)]" />
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="font-semibold">1234567890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-[var(--primary)]" />
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold">support@example.com</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white shadow-sm border rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-gray-700 border-b pb-2">Social Media</h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="bg-blue-700 text-white px-4 py-2 rounded font-bold">Facebook</a>
              <a href="#" className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-4 py-2 rounded font-bold">Instagram</a>
              <a href="#" className="bg-blue-400 text-white px-4 py-2 rounded font-bold">Twitter</a>
              <a href="#" className="bg-black text-white px-4 py-2 rounded font-bold">TikTok</a>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default ContactPage;
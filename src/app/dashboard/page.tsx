export default function DashboardContent() {
  return (
    <div className="flex-1 p-6 space-y-6 bg-gray-50">
      {/* Campaigns + Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaigns */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Campaigns</h2>
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Campaigns</option>
            </select>
          </div>
          <div className="space-y-2">
            {["Just Herbs", "Juicy Chemistry", "Hyugalife 2", "Honeyveda", "HempStreet", "HealthyHey 2"].map((name) => (
              <div
                key={name}
                className="flex justify-between items-center border rounded px-3 py-2 text-sm"
              >
                <span>{name}</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Recent Activity</h2>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Most Recent</option>
            </select>
          </div>
          <div className="space-y-3">
            {[
              { name: "Om Satyarthy", role: "Regional Head", status: "Pending Approval" },
              { name: "Dr. Bhuvaneshwari", role: "Fertility & Women’s Health", status: "Sent 7 mins ago" },
              { name: "Surdeep Singh", role: "Product-led SEO Growth", status: "Sent 7 mins ago" },
              { name: "Dilbag Singh", role: "Manager Marketing", status: "Sent 7 mins ago" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-sm border-b pb-2"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.role}</div>
                </div>
                <div className="text-purple-600 text-xs font-medium">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LinkedIn Accounts */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">LinkedIn Accounts</h2>
        <div className="flex items-center justify-between text-sm">
          <div>
            <div className="font-medium">Pulkit Garg</div>
            <div className="text-xs text-gray-500">1999pulkitgarg@gmail.com</div>
          </div>
          <div className="text-blue-600 font-medium">Connected</div>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-[70%]" />
        </div>
        <div className="text-xs text-gray-500 mt-1">17/30</div>
      </div>
    </div>
  );
}

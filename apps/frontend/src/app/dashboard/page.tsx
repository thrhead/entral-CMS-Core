export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-sm font-medium text-gray-500">Total Pages</div>
                    <div className="mt-2 text-3xl font-bold">12</div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-sm font-medium text-gray-500">Active Users</div>
                    <div className="mt-2 text-3xl font-bold">3</div>
                </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Create New Page</button>
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">Manage Users</button>
                </div>
            </div>
        </div>
    )
}

export default function DownloadsPage() {
  const files = [{ name: "Demo Notes.txt", url: "/downloads/sample.txt" }];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📥 Downloads</h1>

        {/* File Card Section */}
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6">
          {files.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {files.map((file) => (
                <li
                  key={file.url}
                  className="flex items-center justify-between py-4 hover:bg-gray-50 px-3 rounded-lg transition-all duration-200"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {file.name}
                  </span>

                  <a
                    href={file.url}
                    download
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No downloadable resources available yet.
            </p>
          )}
        </div>

        {/* Note */}
        <p className="text-gray-500 text-sm mt-4 text-center">
          Having trouble downloading? Contact support.
        </p>
      </div>
    </div>
  );
}

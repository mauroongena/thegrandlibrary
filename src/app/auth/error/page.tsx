import Link from "next/link";

export default function AuthErrorPage() {
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white flex items-center justify-center p-6">
			<div className="max-w-md w-full mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-xl text-center">
				<h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
					Access Denied
				</h1>
				<p className="text-gray-300 mb-6 text-lg">
					You do not have permission to view this page.<br />
					Please contact an administrator if you believe this is an error.
				</p>
				<Link
					href="/"
					className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors"
				>
					Go to Home
				</Link>
			</div>
		</div>
	);
}

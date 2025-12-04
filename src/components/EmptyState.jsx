export function NoReposEmptyState() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-purple-200/50 text-center">
			<div className="text-6xl md:text-7xl mb-4">📦</div>
			<h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">No Repositories Yet</h3>
			<p className="text-gray-600">This user hasn't created any public repositories yet.</p>
		</div>
	);
}

export function NoLanguagesEmptyState() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-purple-200/50 text-center">
			<div className="text-5xl md:text-6xl mb-4">💻</div>
			<h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">No Language Data</h3>
			<p className="text-gray-600 text-sm">No programming languages detected in repositories.</p>
		</div>
	);
}

export function NoActivityEmptyState() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-purple-200/50 text-center">
			<div className="text-5xl md:text-6xl mb-4">📊</div>
			<h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">No Activity Data</h3>
			<p className="text-gray-600 text-sm">No repository activity to display.</p>
		</div>
	);
}

export function NoTopReposEmptyState() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-purple-200/50 text-center">
			<div className="text-5xl md:text-6xl mb-4">⭐</div>
			<h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">No Starred Repositories</h3>
			<p className="text-gray-600 text-sm">This user doesn't have any repositories with stars or forks yet.</p>
		</div>
	);
}

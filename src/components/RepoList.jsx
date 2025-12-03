export default function RepoList({ repos }) {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200/50">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">Top Repositories</h2>
			<div className="space-y-4">
				{repos.map((repo) => (
					<RepoCard key={repo.id} repo={repo} />
				))}
			</div>
		</div>
	);
}

function RepoCard({ repo }) {
	return (
		<a
			href={repo.html_url}
			target="_blank"
			rel="noopener noreferrer"
			className="block p-5 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:border-purple-400 hover:shadow-md transition-all duration-300 group"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-2 truncate">
						{repo.name}
					</h3>
					{repo.description && (
						<p className="text-gray-600 text-sm mb-3 line-clamp-2">{repo.description}</p>
					)}
					<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
						{repo.language && (
							<div className="flex items-center gap-1">
								<span className="w-3 h-3 rounded-full bg-purple-500"></span>
								<span>{repo.language}</span>
							</div>
						)}
						<div className="flex items-center gap-1">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<span>{repo.stargazers_count}</span>
						</div>
						<div className="flex items-center gap-1">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<span>{repo.forks_count}</span>
						</div>
					</div>
				</div>
				<svg
					className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</div>
		</a>
	);
}

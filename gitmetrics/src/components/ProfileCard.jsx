export default function ProfileCard({ profile, totalStats }) {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200/50">
			<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
				{/* Avatar */}
				<div className="relative">
					<img
						src={profile.avatar_url}
						alt={profile.name || profile.login}
						className="w-32 h-32 rounded-full shadow-lg relative z-10"
					/>
					<div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-400/30 to-pink-400/30 blur-xl"></div>
				</div>

				{/* User Info */}
				<div className="flex-1 text-center md:text-left">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						{profile.name || profile.login}
					</h1>
					<a
						href={`https://github.com/${profile.login}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-purple-600 hover:text-purple-700 font-medium mb-3 inline-block hover:underline transition-colors hover:cursor-pointer"
					>
						@{profile.login}
					</a>

					{profile.bio && <p className="text-gray-600 mb-4">{profile.bio}</p>}

					<div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
						{profile.location && (
							<div className="flex items-center gap-1">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span>{profile.location}</span>
							</div>
						)}
						{profile.company && (
							<div className="flex items-center gap-1">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
								<span>{profile.company}</span>
							</div>
						)}
						{profile.blog && (
							<a
								href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 hover:text-purple-600 transition-colors"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
									/>
								</svg>
								<span>{profile.blog}</span>
							</a>
						)}
					</div>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-gray-200">
				<StatItem label="Repositories" value={profile.public_repos} />
				<StatItem label="Followers" value={profile.followers} />
				<StatItem label="Following" value={profile.following} />
				<StatItem label="Total Stars" value={totalStats.stars} />
				<StatItem label="Total Forks" value={totalStats.forks} />
			</div>
		</div>
	);
}

function StatItem({ label, value }) {
	return (
		<div className="text-center">
			<div className="text-2xl font-bold text-purple-600">{value.toLocaleString()}</div>
			<div className="text-sm text-gray-500 mt-1">{label}</div>
		</div>
	);
}

export function ProfileCardSkeleton() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8 border border-purple-200/50 animate-pulse">
			<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
				{/* Avatar Skeleton */}
				<div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300"></div>

				{/* User Info Skeleton */}
				<div className="flex-1 text-center md:text-left w-full">
					{/* Name */}
					<div className="h-8 bg-gray-300 rounded-lg w-48 mx-auto md:mx-0 mb-2"></div>
					{/* Username */}
					<div className="h-6 bg-gray-300 rounded-lg w-32 mx-auto md:mx-0 mb-3"></div>
					{/* Bio */}
					<div className="h-4 bg-gray-300 rounded-lg w-full max-w-md mx-auto md:mx-0 mb-2"></div>
					<div className="h-4 bg-gray-300 rounded-lg w-3/4 max-w-sm mx-auto md:mx-0 mb-4"></div>

					{/* Info items */}
					<div className="flex flex-wrap gap-4 justify-center md:justify-start">
						<div className="h-4 bg-gray-300 rounded-lg w-24"></div>
						<div className="h-4 bg-gray-300 rounded-lg w-32"></div>
						<div className="h-4 bg-gray-300 rounded-lg w-28"></div>
					</div>
				</div>
			</div>

			{/* Stats Grid Skeleton */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-gray-200">
				{[...Array(5)].map((_, i) => (
					<div key={i} className="text-center">
						<div className="h-8 bg-gray-300 rounded-lg w-16 mx-auto mb-2"></div>
						<div className="h-4 bg-gray-300 rounded-lg w-20 mx-auto"></div>
					</div>
				))}
			</div>
		</div>
	);
}

export function ActivityChartSkeleton() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8 border border-purple-200/50 animate-pulse">
			<div className="h-7 bg-gray-300 rounded-lg w-48 mb-4 md:mb-6"></div>
			<div className="h-64 md:h-80 bg-gray-200 rounded-lg"></div>
		</div>
	);
}

export function LanguageChartSkeleton() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8 border border-purple-200/50 animate-pulse">
			<div className="h-7 bg-gray-300 rounded-lg w-48 mb-4 md:mb-6"></div>
			<div className="h-64 md:h-80 flex items-center justify-center">
				<div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200"></div>
			</div>
		</div>
	);
}

export function RepoListSkeleton() {
	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8 border border-purple-200/50 animate-pulse">
			<div className="h-7 bg-gray-300 rounded-lg w-48 mb-4 md:mb-6"></div>
			<div className="space-y-4">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="p-4 md:p-5 bg-gray-100 rounded-xl border border-gray-200"
					>
						{/* Repo name */}
						<div className="h-6 bg-gray-300 rounded-lg w-3/4 mb-2"></div>
						{/* Description */}
						<div className="h-4 bg-gray-300 rounded-lg w-full mb-1"></div>
						<div className="h-4 bg-gray-300 rounded-lg w-2/3 mb-3"></div>
						{/* Stats */}
						<div className="flex gap-4">
							<div className="h-4 bg-gray-300 rounded-lg w-16"></div>
							<div className="h-4 bg-gray-300 rounded-lg w-12"></div>
							<div className="h-4 bg-gray-300 rounded-lg w-12"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompleteProfile } from '../utils/github';
import ProfileCard from '../components/ProfileCard';
import LanguageChart from '../components/LanguageChart';
import RepoList from '../components/RepoList';
import ActivityChart from '../components/ActivityChart';
import SearchBar from '../components/SearchBar';
import {
	ProfileCardSkeleton,
	ActivityChartSkeleton,
	LanguageChartSkeleton,
	RepoListSkeleton,
} from '../components/SkeletonLoader';
import { NoReposEmptyState } from '../components/EmptyState';

export default function Profile() {
	const { username } = useParams();
	const navigate = useNavigate();
	const [completeProfile, setCompleteProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await getCompleteProfile(username);
				setCompleteProfile(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (username) {
			fetchProfile();
		}
	}, [username]);

	return (
		<div className="min-h-screen px-4 py-8 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			{/* Header with Logo and Back button */}
			<div className="relative z-10 max-w-7xl mx-auto mb-8">
				{/* Mobile Layout: Stacked */}
				<div className="flex flex-col gap-4 md:hidden">
					<div className="flex items-center justify-between">
						<button
							onClick={() => navigate('/')}
							className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors font-medium hover:cursor-pointer"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							<span className="text-sm">Back</span>
						</button>

						{/* Logo - smaller on mobile */}
						<div className="text-2xl font-black">
							<span className="text-white tracking-wide" style={{ WebkitTextStroke: '1.5px #b794f4' }}>
								Git
							</span>
							<span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">Metrics</span>
						</div>
					</div>

					{/* SearchBar - full width on mobile */}
					<SearchBar />
				</div>

				{/* Desktop Layout: Row */}
				<div className="hidden md:flex items-center justify-between gap-6">
					<button
						onClick={() => navigate('/')}
						className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors font-medium hover:cursor-pointer shrink-0"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						Back to Search
					</button>

					{/* SearchBar */}
					<SearchBar />

					{/* Logo */}
					<div className="flex items-center gap-2 shrink-0">
						<div className="text-4xl font-black">
							<span className="text-white tracking-wide" style={{ WebkitTextStroke: '2px #b794f4' }}>
								Git
							</span>
							<span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">Metrics</span>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl mx-auto">
				{loading && (
					<div className="space-y-6">
						{/* Profile Card Skeleton */}
						<ProfileCardSkeleton />

						{/* Activity Chart Skeleton */}
						<ActivityChartSkeleton />

						{/* Language Chart and Repo List Grid Skeleton */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<LanguageChartSkeleton />
							<RepoListSkeleton />
						</div>
					</div>
				)}

				{error && (
					<div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
						<div className="text-6xl mb-4">😕</div>
						<h2 className="text-2xl font-bold text-red-800 mb-2">Oops! Something went wrong</h2>
						<p className="text-red-600 mb-6">{error}</p>
						<button
							onClick={() => navigate('/')}
							className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
						>
							Try Another Profile
						</button>
					</div>
				)}

				{completeProfile && !loading && !error && (
					<div className="space-y-6">
						{/* Profile Card */}
						<ProfileCard profile={completeProfile.profile} totalStats={completeProfile.totalStats} />

						{/* Check if user has any repos */}
						{!completeProfile.repos || completeProfile.repos.length === 0 ? (
							<NoReposEmptyState />
						) : (
							<>
								{/* Activity Chart */}
								<ActivityChart repos={completeProfile.repos} />

								{/* Language Chart and Repo List Grid */}
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									<LanguageChart languageStats={completeProfile.languageStats} />
									<RepoList repos={completeProfile.topRepos} />
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { NoActivityEmptyState } from './EmptyState';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ActivityChart({ repos }) {
	const [selectedMonth, setSelectedMonth] = useState(null);

	// Group repositories by month/year
	const activityData = processRepoActivity(repos);

	// Check if there's no data
	if (!repos || repos.length === 0) {
		return <NoActivityEmptyState />;
	}

	// Get repos for selected month
	const getReposForMonth = (monthLabel) => {
		return repos.filter((repo) => {
			const date = new Date(repo.created_at);
			const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
			return monthYear === monthLabel;
		});
	};

	const selectedRepos = selectedMonth ? getReposForMonth(selectedMonth) : null;

	const handleChartClick = (_event, elements) => {
		if (elements.length > 0) {
			const index = elements[0].index;
			const clickedMonth = activityData.labels[index];
			setSelectedMonth(clickedMonth === selectedMonth ? null : clickedMonth);
		}
	};

	const data = {
		labels: activityData.labels,
		datasets: [
			{
				label: 'Repositories Created',
				data: activityData.data,
				backgroundColor: 'rgba(147, 51, 234, 0.6)',
				borderColor: 'rgba(147, 51, 234, 1)',
				borderWidth: 2,
				borderRadius: 8,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		onClick: handleChartClick,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return `${context.parsed.y} ${context.parsed.y === 1 ? 'repository' : 'repositories'}`;
					},
					footer: function () {
						return 'Click to view repositories';
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
					color: '#4B5563',
				},
				grid: {
					color: 'rgba(0, 0, 0, 0.05)',
				},
			},
			x: {
				ticks: {
					color: '#4B5563',
				},
				grid: {
					display: false,
				},
			},
		},
		interaction: {
			mode: 'index',
			intersect: false,
		},
		onHover: (event, activeElements) => {
			event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
		},
	};

	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8 border border-purple-200/50">
			<div className="flex items-center justify-between mb-4 md:mb-6">
				<h2 className="text-xl md:text-2xl font-bold text-gray-800">Repository Activity</h2>
				{selectedMonth && (
					<button
						onClick={() => setSelectedMonth(null)}
						className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center gap-1"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
						Clear Selection
					</button>
				)}
			</div>
			<div className="h-64 md:h-80">
				<Bar data={data} options={options} />
			</div>

			{/* Show repos for selected month */}
			{selectedRepos && (
				<div className="mt-6 pt-6 border-t border-gray-200 animate-slide-in-up">
					<h3 className="text-lg font-bold text-gray-800 mb-4">
						Repositories created in {selectedMonth} ({selectedRepos.length})
					</h3>
					<div className="space-y-3 max-h-96 overflow-y-auto">
						{selectedRepos.map((repo, index) => (
							<a
								key={repo.id}
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="block p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/50 hover:border-purple-400 hover:shadow-md transition-all duration-300 group animate-fade-in-up"
								style={{ animationDelay: `${index * 50}ms` }}
							>
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1 min-w-0">
										<h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-1 truncate">
											{repo.name}
										</h4>
										{repo.description && (
											<p className="text-sm text-gray-600 line-clamp-2 mb-2">{repo.description}</p>
										)}
										<div className="flex items-center gap-3 text-xs text-gray-500">
											{repo.language && (
												<div className="flex items-center gap-1">
													<span className="w-2 h-2 rounded-full bg-purple-500"></span>
													<span>{repo.language}</span>
												</div>
											)}
											<div className="flex items-center gap-1">
												<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
												<span>{repo.stargazers_count}</span>
											</div>
											<div className="flex items-center gap-1">
												<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
													<path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
												</svg>
												<span>{repo.forks_count}</span>
											</div>
										</div>
									</div>
									<svg
										className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition-colors shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</div>
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function processRepoActivity(repos) {
	const activityMap = {};

	repos.forEach((repo) => {
		const date = new Date(repo.created_at);
		const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

		activityMap[monthYear] = (activityMap[monthYear] || 0) + 1;
	});

	// Get all entries and sort by date
	const entries = Object.entries(activityMap).map(([label, count]) => {
		const [month, year] = label.split(' ');
		const date = new Date(`${month} 1, ${year}`);
		return { label, count, date };
	});

	entries.sort((a, b) => a.date - b.date);

	// Take last 12 months or all if less than 12
	const recentEntries = entries.slice(-12);

	return {
		labels: recentEntries.map((e) => e.label),
		data: recentEntries.map((e) => e.count),
	};
}

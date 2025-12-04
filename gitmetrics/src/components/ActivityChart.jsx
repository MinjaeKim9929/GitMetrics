import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { NoActivityEmptyState } from './EmptyState';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ActivityChart({ repos }) {
	// Group repositories by month/year
	const activityData = processRepoActivity(repos);

	// Check if there's no data
	if (!repos || repos.length === 0) {
		return <NoActivityEmptyState />;
	}

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
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						return `${context.parsed.y} ${context.parsed.y === 1 ? 'repository' : 'repositories'}`;
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
	};

	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8 border border-purple-200/50">
			<h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Repository Activity</h2>
			<div className="h-64 md:h-80">
				<Bar data={data} options={options} />
			</div>
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

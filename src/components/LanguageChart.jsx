import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { NoLanguagesEmptyState } from './EmptyState';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LanguageChart({ languageStats }) {
	// Check if there's no language data
	if (!languageStats || !languageStats.labels || languageStats.labels.length === 0) {
		return <NoLanguagesEmptyState />;
	}

	const colors = [
		'rgba(147, 51, 234, 0.8)', // purple
		'rgba(236, 72, 153, 0.8)', // pink
		'rgba(59, 130, 246, 0.8)', // blue
		'rgba(34, 197, 94, 0.8)', // green
		'rgba(251, 146, 60, 0.8)', // orange
		'rgba(239, 68, 68, 0.8)', // red
		'rgba(14, 165, 233, 0.8)', // sky
		'rgba(168, 85, 247, 0.8)', // violet
		'rgba(234, 179, 8, 0.8)', // yellow
		'rgba(129, 140, 248, 0.8)', // indigo
	];

	const data = {
		labels: languageStats.labels,
		datasets: [
			{
				data: languageStats.data,
				backgroundColor: colors.slice(0, languageStats.labels.length),
				borderColor: 'rgba(255, 255, 255, 0.8)',
				borderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'right',
				labels: {
					padding: 15,
					font: {
						size: 12,
					},
					color: '#4B5563',
				},
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const label = context.label || '';
						const value = context.parsed || 0;
						const total = context.dataset.data.reduce((a, b) => a + b, 0);
						const percentage = ((value / total) * 100).toFixed(1);
						return `${label}: ${value} repos (${percentage}%)`;
					},
				},
			},
		},
	};

	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8 border border-purple-200/50">
			<h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Language Distribution</h2>
			<div className="h-64 md:h-80">
				<Doughnut data={data} options={options} />
			</div>
		</div>
	);
}

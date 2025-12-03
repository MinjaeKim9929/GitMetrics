import { useState } from 'react';
import { useNavigate } from 'react-router';

function Home() {
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		if (username.trim()) {
			navigate(`/profile/${username}`);
		}
	};

	const tryExample = (exampleUsername) => {
		navigate(`/profile/${exampleUsername}`);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 w-full max-w-4xl">
				{/* Header */}
				<div className="text-center mb-16 animate-fade-in">
					<div className="inline-block mb-6 px-2">
						<div className="text-7xl md:text-8xl font-black mb-2 tracking-tight">
							<span className="text-white" style={{ WebkitTextStroke: '2.5px #b794f4' }}>
								Git
							</span>
							<span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-1">
								Metrics
							</span>
						</div>
						<div className="h-1 w-full bg-linear-to-r from-purple-400 to-pink-400 rounded-full"></div>
					</div>
					<p className="text-gray-600 text-xl md:text-2xl font-normal max-w-2xl mx-auto">
						Discover insights, visualize contributions, and analyze any GitHub profile instantly
					</p>
				</div>

				{/* Search Form */}
				<form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto mb-12">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1 relative group">
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Enter GitHub username..."
								className="w-full px-6 py-5 rounded-xl bg-white/5 backdrop-blur-md text-gray-600 placeholder-gray-400 focus:placeholder-transparent border-2 border-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 text-lg transition-all duration-300 shadow-lg group-hover:border-white/20"
							/>
							<div className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
						</div>
						<button
							type="submit"
							disabled={!username.trim()}
							className="px-10 py-5 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed hover:cursor-pointer text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
						>
							Analyze
						</button>
					</div>
				</form>

				{/* Example Users */}
				<div className="text-center">
					<p className="text-gray-400 mb-4 text-sm uppercase tracking-wider font-semibold">
						Try with Following Profiles
					</p>
					<div className="flex flex-wrap justify-center gap-3">
						{['MinjaeKim9929', 'insooeric', 'luisgcode', 'farouk-afolabi'].map((example) => (
							<button
								key={example}
								onClick={() => tryExample(example)}
								className="group px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:cursor-pointer"
							>
								<span className="text-purple-400 group-hover:text-purple-500 font-medium">@{example}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;

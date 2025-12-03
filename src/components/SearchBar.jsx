import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function SearchBar() {
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		if (username.trim()) {
			navigate(`/profile/${username.trim()}`);
			setUsername('');
		}
	};

	return (
		<form onSubmit={handleSearch} className="flex-1 max-w-md">
			<div className="relative group">
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Search another user..."
					className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/5 backdrop-blur-md text-gray-600 placeholder-gray-400 focus:placeholder-transparent border-2 border-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 text-sm transition-all duration-300 shadow-lg group-hover:border-white/20 hover:cursor-pointer"
				/>
				<div className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
				<button
					type="submit"
					disabled={!username.trim()}
					className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-500 disabled:text-gray-500 disabled:cursor-not-allowed hover:cursor-pointer transition-colors z-10 hover:scale-105"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</form>
	);
}

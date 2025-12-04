import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function SearchBar() {
	const [username, setUsername] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const searchRef = useRef(null);
	const abortControllerRef = useRef(null);

	// Load recent searches from localStorage
	const [recentSearches, setRecentSearches] = useState(() => {
		const saved = localStorage.getItem('gitmetrics_recent_searches');
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (err) {
				console.error('Failed to load recent searches:', err);
				return [];
			}
		}
		return [];
	});

	// Fetch user suggestions from GitHub API
	useEffect(() => {
		const fetchSuggestions = async () => {
			if (username.trim().length < 2) {
				setSuggestions([]);
				return;
			}

			// Cancel previous request
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}

			abortControllerRef.current = new AbortController();

			try {
				setLoading(true);
				const response = await axios.get(`https://api.github.com/search/users`, {
					params: {
						q: username.trim(),
						per_page: 5,
					},
					headers: {
						Accept: 'application/vnd.github.v3+json',
						...(import.meta.env.VITE_GITHUB_TOKEN && {
							Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
						}),
					},
					signal: abortControllerRef.current.signal,
				});

				setSuggestions(response.data.items || []);
			} catch (err) {
				if (err.name !== 'CanceledError') {
					console.error('Failed to fetch suggestions:', err);
					setSuggestions([]);
				}
			} finally {
				setLoading(false);
			}
		};

		const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce

		return () => {
			clearTimeout(timeoutId);
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [username]);

	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const saveToRecent = (user) => {
		const updated = [user, ...recentSearches.filter((u) => u !== user)].slice(0, 5);
		setRecentSearches(updated);
		localStorage.setItem('gitmetrics_recent_searches', JSON.stringify(updated));
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (username.trim()) {
			const trimmedUsername = username.trim();
			saveToRecent(trimmedUsername);
			navigate(`/profile/${trimmedUsername}`);
			setUsername('');
			setShowSuggestions(false);
		}
	};

	const handleSuggestionClick = (user) => {
		saveToRecent(user);
		navigate(`/profile/${user}`);
		setUsername('');
		setShowSuggestions(false);
	};

	const removeSuggestion = (e, user) => {
		e.stopPropagation();
		const updated = recentSearches.filter((u) => u !== user);
		setRecentSearches(updated);
		localStorage.setItem('gitmetrics_recent_searches', JSON.stringify(updated));
	};

	const showRecentSearches = recentSearches.length > 0 && username.length === 0;
	const showAutocompleteSuggestions = username.length >= 2 && suggestions.length > 0;

	return (
		<form onSubmit={handleSearch} className="flex-1 max-w-md" ref={searchRef}>
			<div className="relative group">
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					onFocus={() => setShowSuggestions(true)}
					placeholder="Search another user..."
					className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/5 backdrop-blur-md text-gray-600 placeholder-gray-400 focus:placeholder-transparent border-2 border-purple-300/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 text-sm transition-all duration-300 shadow-lg group-hover:border-white/20"
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

				{/* Suggestions Dropdown */}
				{showSuggestions && (showRecentSearches || showAutocompleteSuggestions || loading) && (
					<div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-purple-200/50 overflow-hidden z-100 animate-fade-in-up">
						{/* Recent Searches */}
						{showRecentSearches && (
							<div className="p-2">
								<div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									Recent Searches
								</div>
								{recentSearches.map((user) => (
									<button
										key={user}
										type="button"
										onClick={() => handleSuggestionClick(user)}
										className="w-full flex items-center justify-between px-3 py-2 hover:bg-purple-50 rounded-lg transition-colors group/item"
									>
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											<span className="text-sm text-gray-700 group-hover/item:text-purple-600 font-medium">
												{user}
											</span>
										</div>
										<button
											type="button"
											onClick={(e) => removeSuggestion(e, user)}
											className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-purple-100 rounded transition-all"
										>
											<svg className="w-3 h-3 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</button>
								))}
							</div>
						)}

						{/* Loading State */}
						{loading && username.length >= 2 && (
							<div className="p-4 text-center">
								<div className="inline-block w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
								<p className="text-xs text-gray-500 mt-2">Searching...</p>
							</div>
						)}

						{/* Autocomplete Suggestions from GitHub API */}
						{showAutocompleteSuggestions && !loading && (
							<div className={`p-2 ${showRecentSearches ? 'border-t border-gray-200' : ''}`}>
								<div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									Suggestions
								</div>
								{suggestions.map((user) => (
									<button
										key={user.id}
										type="button"
										onClick={() => handleSuggestionClick(user.login)}
										className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded-lg transition-colors group/item"
									>
										<img
											src={user.avatar_url}
											alt={user.login}
											className="w-6 h-6 rounded-full"
										/>
										<div className="flex-1 text-left">
											<span className="text-sm text-gray-700 group-hover/item:text-purple-600 font-medium block">
												{user.login}
											</span>
											{user.type && (
												<span className="text-xs text-gray-500">{user.type}</span>
											)}
										</div>
									</button>
								))}
							</div>
						)}

						{/* No results */}
						{!loading && username.length >= 2 && suggestions.length === 0 && (
							<div className="p-4 text-center">
								<p className="text-sm text-gray-500">No users found</p>
							</div>
						)}
					</div>
				)}
			</div>
		</form>
	);
}

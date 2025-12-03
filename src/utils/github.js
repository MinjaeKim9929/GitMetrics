import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// Axios instance for GitHub API calls
const api = axios.create({
	baseURL: GITHUB_API,
	headers: {
		Accept: 'application/vnd.github.v3+json',
		Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
	},
});

// Fetch user basic information
export const getUserProfile = async (username) => {
	try {
		const response = await api.get(`/users/${username}`);
		return response.data;
	} catch (err) {
		throw new Error('User not found');
	}
};

// Fetch all user repositories
export const getUserRepos = async (username) => {
	try {
		const response = await api.get(`/users/${username}/repos`, {
			params: {
				per_page: 100,
				sort: 'updated',
			},
		});
		return response.data;
	} catch (err) {
		throw new Error('Failed to fetch repositories');
	}
};

// Calculate language statistics
export const calculateLanguageStats = (repos) => {
	const languageCount = {};

	repos.forEach((repo) => {
		if (repo.language) {
			languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
		}
	});

	// Convert object to array and sort
	const sortedLanguages = Object.entries(languageCount).sort((a, b) => b[1] - a[1]);
	// .slice(0, 5);      // For Top 5 Only

	return {
		labels: sortedLanguages.map(([lang]) => lang),
		data: sortedLanguages.map(([, count]) => count),
	};
};

// Get top repositories (based on stars + forks)
export const getTopRepos = (repos, limit = 5) => {
	return repos
		.filter((repo) => !repo.fork) // Exclude forked repos
		.sort((a, b) => b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count))
		.slice(0, limit);
};

// Calculate total stars and forks
export const getTotalStats = (repos) => {
	return repos.reduce(
		(acc, repo) => {
			return {
				stars: acc.stars + repo.stargazers_count,
				forks: acc.forks + repo.forks_count,
			};
		},
		{ stars: 0, forks: 0 }
	);
};

// Fetch all data at once
export const getCompleteProfile = async (username) => {
	const [profile, repos] = await Promise.all([getUserProfile(username), getUserRepos(username)]);

	const languageStats = calculateLanguageStats(repos);
	const topRepos = getTopRepos(repos);
	const totalStats = getTotalStats(repos);

	return { profile, repos, languageStats, topRepos, totalStats };
};

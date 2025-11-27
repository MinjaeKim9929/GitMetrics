import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile/:username" element={<Profile />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;

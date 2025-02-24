import { Link } from "react-router-dom";
const Home = () => (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My App</h1>
        <p className="text-lg text-gray-600 mb-8">
            Your one-stop solution for seamless authentication and secure access.
        </p>
        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Get Started
        </Link>
    </div>
);

export default Home;

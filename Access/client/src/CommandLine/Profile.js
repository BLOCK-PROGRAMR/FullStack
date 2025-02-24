const Profile = () => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <p>Name:Nithinkumar</p>
            <p>Email: 0xscater@gmail.com</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
                Back to Home
            </button>
        </div>
    );
};

export default Profile;

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            // Perform the logout on the server-side (clear server-side session, token, etc.)
            const response = await fetch('/Home/Logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                // Clear authentication data from localStorage or sessionStorage
                localStorage.removeItem('authToken');  // Or use sessionStorage.removeItem()

                // Optionally clear cookies if you're using cookies for authentication
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                // Redirect to the login page
                window.location.href = '/Home/Index';
            } else {
                console.error('Error logging out:', result.message);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
            </button>
        </div>
    );
};

ReactDOM.render(<LogoutButton />, document.getElementById('logOutBtn'));

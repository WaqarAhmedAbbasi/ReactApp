const LoginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userCredentials = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/Home/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Login successful');
                window.location.href = '/Home/Contact'; 
                // Optionally redirect the user or take some action
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('An error occurred while logging in');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {message && <div className="alert mt-3">{message}</div>}
        </div>
    );
};

ReactDOM.render(<LoginForm />, document.getElementById('root'));
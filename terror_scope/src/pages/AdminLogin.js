import '../styling/AdminLogin.css';
import React from 'react';

function AdminLogin() {
    // const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //     fetch("/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));
    // }, []);

    return (
        
        <div class="login-box">
            <h2>Login</h2>
            <form>
                <div class="user-box">
                    <input type="text" name="" required=""/>
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required=""/>
                    <label>Password</label>
                </div>
                <a href="/home">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </a>
            </form>
        </div>
    );
}

export default AdminLogin;
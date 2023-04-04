

// export default function LoginPage() {
//   const [session, loading] = useSession();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     signIn("credentials", { username, password, callbackUrl: "/" });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (session) return <div>You are already logged in!</div>;

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h1>Login</h1>
//         <label htmlFor="username">Username:</label>
//         <input
//         type="text"
//         id="username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         />
//         <br />
//         <label htmlFor="password">Password:</label>
//         <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <button type="submit">Login</button>
//     </form>
//     <button onClick={() => signIn("google")}>Login with Google</button>
//     </div>
//     );
// }

export default function auth(){

    return (
        <div>
        <a href="/api/auth/login">Login</a>
        <br></br>
        <a href="/api/auth/logout">Logout</a>
        </div>
    )
}
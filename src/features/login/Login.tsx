export const LoginCustom = () => {
	return (

		<div style={{ backgroundColor: "lightblue"}}>
			<>
				<p>
					To log in get registered
					<a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
						here
					</a>
				</p>
				<p>or use common test account credentials:</p>
				<p>Email: free@samuraijs.com</p>
				<p>Password: free</p>
			</>
			<form >
				<label id="email">Email</label>
				<input type="email" id="email" name="email"/>

				<label id="password">Password</label>
				<input type="password" id="password" name="password"/>

				<label>
					<input type="checkbox" name="remember"/>
					Remember me
				</label>

				<button type="submit">Login</button>
			</form>
		</div>

	)
}
import {useFormik} from "formik";

export const LoginCustom = () => {


	const formik = useFormik({
		initialValues: {
			password: '',
			remember: false,
			email: '',
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	console.log(formik.values)
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
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}/>

				<label>
					<input
						type="checkbox"
						name="remember"
						// value={formik.values.remember}
						onChange={formik.handleChange}/>
					Remember me
				</label>

				<button type="submit">Login</button>
			</form>
		</div>

	)
}
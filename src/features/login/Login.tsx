import {useFormik} from "formik";

export const LoginCustom = () => {

	type ErrorType = {
		password?: string
		email?: string

	}
	const formik = useFormik({
		initialValues: {
			password: '',
			remember: false,
			email: '',
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
			formik.resetForm()
		},
		validate: (values) => {
			const errors: ErrorType = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}
			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 3) {
				errors.password = 'Must be 3 characters or more';
			}
			return errors
		}
	});

	return (

		<div style={{backgroundColor: "lightblue"}}>
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
			<form onSubmit={formik.handleSubmit}>
				<div>
					<label htmlFor="email">Email </label>
					<input
						id="email"
						type='text'
						{...formik.getFieldProps('email')}
						// reduce code
						// value={formik.values.email}
						// onBlur={formik.handleBlur}
						// onChange={formik.handleChange}
					/>

					{formik.touched.email && formik.errors.email && <p style={{color: "red"}}>{formik.errors.email}</p>}
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						{...formik.getFieldProps('password')}
					/>

					{formik.touched.password && formik.errors.password &&
                        <p style={{color: "red"}}>{formik.errors.password}</p>}
				</div>

				<div>
					<label>
						<input
							type="checkbox"
							name="remember"
							checked={formik.values.remember}
							onChange={formik.handleChange}/>
						Remember me
					</label>
				</div>


				<button type="submit">Login</button>
			</form>
		</div>

	)
}
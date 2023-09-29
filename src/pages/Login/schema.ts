import * as yup from 'yup'
export const LoginSchema = yup.object().shape({
	username: yup.string().required('This is a required field'),
	password: yup.string().min(8).max(32).required('This is a required field'),
})

import * as yup from 'yup'
export const RegisterSchema = yup.object().shape({
	email: yup
		.string()
		.email('Must be correct email')
		.required('This is a required field'),
	password: yup.string().min(8).max(32).required('This is a required field'),
	username: yup.string().required('This is a required field'),
	name: yup.object().shape({
		firstname: yup.string().required('This is a required field'),
		lastname: yup.string().required('This is a required field'),
	}),
	address: yup.object().shape({
		city: yup.string().required('This is a required field'),
		street: yup.string().required('This is a required field'),
		number: yup
			.number()
			.required('This is a required field')
			.typeError('Must be a number'),
		zipcode: yup
			.number()
			.required('This is a required field')
			.max(9999999999, 'Zipcodes must have less than 10 chars')
			.typeError('Must be a number'),
	}),

	phone: yup
		.string()
		.matches(
			/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
			'Phone must be in format 1-111-111-1111'
		)
		.required('This is a required field'),
})

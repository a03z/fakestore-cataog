import * as yup from 'yup'

const imageUrlRegExp = new RegExp(
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g
)

export const ProductSchema = yup.object().shape({
	title: yup.string().required('This is a required field'),
	price: yup
		.number()
		.min(0.01)
		.required('This is a required field')
		.typeError('Must be a number'),
	description: yup.string().min(16).required('This is a required field'),
	image: yup
		.string()
		.matches(imageUrlRegExp, 'Must be a URL')
		.required('This is a required field'),
	category: yup.string().required('This is a required field'),
})

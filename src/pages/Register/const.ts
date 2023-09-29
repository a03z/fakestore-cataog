// type InputGroups =  {
// 	text: string
// 	id:
// 		| 'email'
// 		| 'firstname'
// 		| 'lastname'
// 		| 'username'
// 		| 'password'
// 		| 'city'
// 		| 'street'
// 		| 'number'
// 		| 'zipcode'
// 	type?: 'text' | 'password'
// 	group: 'name' | 'address'
// }[]

// type InputField = { text: string; id: 'email' }

export const registerInputs = [
	{
		text: 'Email',
		id: 'email',
	},
	[
		{
			text: 'First Name',
			id: 'firstname',
			group: 'name',
		},
		{
			text: 'Last Name',
			id: 'lastname',
			group: 'name',
		},
	],
	[
		{
			text: 'Username',
			id: 'username',
		},
		{
			text: 'Password',
			id: 'password',
			type: 'password',
		},
	],
	[
		{
			text: 'City',
			id: 'city',
			group: 'address',
		},
		{
			text: 'Street',
			id: 'street',
			group: 'address',
		},
	],
	[
		{
			text: 'Number',
			id: 'number',
			group: 'address',
		},
		{
			text: 'Zip Code',
			id: 'zipcode',
			group: 'address',
		},
	],
]

interface ProductFields {
	text: string
	id: 'title' | 'price' | 'image'
}

export const productFields: ProductFields[] = [
	{
		text: 'Title',
		id: 'title',
	},
	{
		text: 'Price',
		id: 'price',
	},

	{
		text: 'Image',
		id: 'image',
	},
]


export type ListItem = {
	id: number
	name: string
	category: number
	quantity: number
	ticked: boolean
}

export type Category = {
	id: number
	name: string
}

export type PluginData = {
	list: {
		categoriesCount: number
		categories: Category[]
		itemsCount: number
		items: ListItem[]
	}
}

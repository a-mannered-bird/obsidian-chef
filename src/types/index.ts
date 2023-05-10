
export type Item = {
	id: number
	name: string
	categoryId: number
	quantity: number
	ticked: boolean
}

export type Category = {
	id: number
	isFolded?: boolean
	name: string
}

export type Settings = {
	showCategories: boolean
	showTicked: boolean
	showUnticked: boolean
}

export type PluginData = {
	list: {
		categoriesCount: number
		categories: Category[]
		itemsCount: number
		items: Item[]
	}
	settings: Settings
}

export const DnDTypes = {
	ITEM: 'item',
	CATEGORY: 'category',
}

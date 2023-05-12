
export type Item = {
	id: number
	name: string
	categoryId: number
	quantity: number
	ticked: boolean
	order: number
}

export type Category = {
	id: number
	isFolded?: boolean
	name: string
	order: number
}

export type Settings = {
	showCategories: boolean
	showTicked: boolean
	showUnticked: boolean
	sortAlphabetically: boolean
	sortByTickedItem: boolean
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

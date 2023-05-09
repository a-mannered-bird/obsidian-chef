import * as React from "react";
import {ListItem, ListCategory, ListFilters} from './components'
import {getData, setItem, setSettings} from './utils'
import {PluginData, Item, Category, Settings} from './types'

export const ListApp = () => {
	const [data, setData] = React.useState<PluginData|null>(null)

	React.useEffect(() => {
		getData().then((value) => {
			setData(value)
		})
	}, [])

	if (!data) return null

	const {showCategories, showTicked, showUnticked} = data.settings

	const onChangeItem = (newItem: Item) => {
		setItem({...data}, newItem).then((newData) => {
			setData(newData)
		})
	}

	const onChangeSettings = (settings: Settings) => {
		setSettings({...data}, settings).then((newData) => {
			setData(newData)
		})
	}

	const displayCategories = () => {
		let categories = (data?.list.categories || [])
			.sort((a: Category, b: Category) => a.name.localeCompare(b.name))
		categories = [{id: -1, name: 'Uncategorised'}].concat(categories)

		return categories.map((category) => {
			return <ListCategory
				key={`category-${category.id}`}
				category={category}
			>
				{displayItems(category.id)}
			</ListCategory>
		})
	}

	const displayItems = (categoryId?: number) => {
		const items = (data?.list.items || [])
			.filter((item: Item) => {
				const isTickedAllowed = item.ticked && showTicked
				const isUntickedAllowed = !item.ticked && showUnticked
				const isFromCategory = !showCategories || item.categoryId === categoryId
				return isFromCategory && (isTickedAllowed || isUntickedAllowed)
			})
			.sort((a: Item, b: Item) => {
				if (a.ticked && !b.ticked) return 1
				if (!a.ticked && b.ticked) return -1
				return a.name.localeCompare(b.name)
			})

		return items.map((item) => {
			return <ListItem
				key={`item-${item.id}`}
				item={item}
				onChange={onChangeItem}
			/>
		})
	}

	return (<>
		<h4>Obsidian Chef List</h4>

		<ListFilters
			settings={data.settings}
			onChange={onChangeSettings}
		/>

		{showCategories && displayCategories()}
		{!showCategories && <>
			<h5>Uncategorised</h5>
			{displayItems()}
		</>}
	</>)
};

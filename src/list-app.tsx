import * as React from "react";
import {ListItem, ListCategory, ListFilters} from './components'
import {getData, setItem, setSettings} from './utils'
import {PluginData, Item, Settings} from './types'

export const ListApp = () => {
	const [data, setData] = React.useState<PluginData|null>(null)
	const [query, setQuery] = React.useState('')

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
		const categories = [{id: -1, name: 'Uncategorised'}]
			.concat(data?.list.categories || [])

		return categories.map((category) => {
			const matchQuery = category.name.toLowerCase().includes(query.toLowerCase())
			const items = displayItems(category.id, matchQuery)

			const hasResults = Array.isArray(items)

			// Hide empty categories when a search is on
			if (query && !matchQuery && !hasResults) return null
			// Hide uncategorised category if it is empty
			if (!hasResults && category.id === -1) return null

			return <ListCategory
				key={`category-${category.id}`}
				category={category}
			>
				{items}
			</ListCategory>
		})
	}

	const displayItems = (categoryId?: number, bypassQuery?: boolean) => {
		const items = (data?.list.items || [])
			.filter((item: Item) => {
				const isTickedAllowed = item.ticked && showTicked
				const isUntickedAllowed = !item.ticked && showUnticked
				const isFromCategory = !showCategories || item.categoryId === categoryId
				return isFromCategory && (isTickedAllowed || isUntickedAllowed)
			})
			.filter((item: Item) => {
				if (!query || bypassQuery) return true
				return item.name.toLowerCase().includes(query.toLowerCase())
			})
			.sort((a: Item, b: Item) => {
				if (a.ticked && !b.ticked) return 1
				if (!a.ticked && b.ticked) return -1
				return a.name.localeCompare(b.name)
			})

		if (!items.length) return <p>
			No items found {categoryId ? 'in this category' : ''}
		</p>

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
			query={query}
			settings={data.settings}
			onAddItem={(item) => {
				onChangeItem(item)
				setQuery('')
			}}
			onChangeQuery={setQuery}
			onChangeSettings={onChangeSettings}
		/>

		{showCategories && displayCategories()}
		{!showCategories && <>
			<h5>Uncategorised</h5>
			{displayItems()}
		</>}
	</>)
};

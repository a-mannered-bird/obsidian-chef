import * as React from "react";
import {ListItem, ListCategory, ListFilters} from './components'
import {getData, setItem, deleteItem, setSettings} from './utils'
import {PluginData, Item, Settings, Category} from './types'

export const ListApp = () => {
	const [data, setData] = React.useState<PluginData|null>(null)
	const [query, setQuery] = React.useState('')
	const [queryError, setQueryError] = React.useState('')


	React.useEffect(() => {
		getData().then((value) => {
			setData(value)
		})
	}, [])

	if (!data) return null

	const {showCategories, showTicked, showUnticked} = data.settings

	const onChangeList = (newItem: Item | Category, type: 'items' | 'categories') => {
		setItem({...data}, newItem, type).then((newData) => {
			setData(newData)
		})
	}

	const onAddItem = (item: Item | Category, type: 'items' | 'categories') => {
		let newItem = item

		if (type === 'items') {
			// Increment quantity of existing item if there is one with the same name
			const existingItem = data.list.items.find((i) => i.name.toLowerCase() === item.name.toLowerCase())
			newItem = existingItem ? {...existingItem, quantity: existingItem.quantity + 1} : item

		} else if (type === 'categories') {
			// Cannot create a category with the same name
			const existingItem = data.list.categories.find((i) => i.name.toLowerCase() === item.name.toLowerCase())
			if (existingItem) {
				setQueryError('This category name already exists. See the results below.')
				return
			}
		}

		onChangeList(newItem, type)
		setQuery('')
		setQueryError('')
	}

	const onDeleteItem = (itemId: number, type: 'items' | 'categories') => {
		deleteItem({...data}, itemId, type).then((newData) => {
			setData(newData)
		})
	}

	const onChangeSettings = (settings: Settings) => {
		setSettings({...data}, settings).then((newData) => {
			setData(newData)
		})
	}

	const displayCategories = () => {
		const categories: Category[] = [{id: -1, name: 'Uncategorised', order: 0}]
			.concat((data?.list.categories || [])
				.sort((a, b) => {
					if (data.settings.sortAlphabetically) return a.name.localeCompare(b.name)
					if (a.order > b.order) return 1
					if (a.order < b.order) return -1
					return 0
				})
			)

		return categories.map((category) => {
			const matchQuery = category.name.toLowerCase().includes(query.toLowerCase())
			const items = displayItems(category.id, matchQuery)

			// Hide empty categories when a search is on
			if (query && !matchQuery && !items.length) return null

			return <ListCategory
				key={`category-${category.id}`}
				category={category}
				itemLength={items.length}
				onChange={(category) => onChangeList(category, 'categories')}
				onDropItem={(item) => onChangeList(item, 'items')}
				onDelete={() => onDeleteItem(category.id, 'categories')}
			>
				{items}
			</ListCategory>
		})
	}

	const displayItems = (categoryId?: number, bypassQuery?: boolean) => {
		const {sortAlphabetically, sortByTickedItem} = data.settings

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
			.sort((a, b) => {
				if (sortByTickedItem) {
					if (a.ticked && !b.ticked) return 1
					if (!a.ticked && b.ticked) return -1
				}

				if (sortAlphabetically) return a.name.localeCompare(b.name)
				if (a.order > b.order) return 1
				if (a.order < b.order) return -1
				return 0
			})

		return items.map((item) => {
			return <ListItem
				key={`item-${item.id}`}
				item={item}
				moveCard={(item) => { console.log('move card', item)}}
				onChange={(item) => onChangeList(item, 'items')}
				onDelete={() => onDeleteItem(item.id, 'items')}
			/>
		})
	}

	return (<>
		<h4>Obsidian Chef List</h4>

		<ListFilters
			error={queryError}
			query={query}
			settings={data.settings}
			onAddItem={onAddItem}
			onChangeQuery={(query) => {
				setQuery(query)
				setQueryError('')
			}}
			onChangeSettings={onChangeSettings}
		/>

		{showCategories && displayCategories()}
		{!showCategories && <>
			<h5 className="oc-list-category-name">Uncategorised</h5>
			{displayItems()}
		</>}

	</>)
};

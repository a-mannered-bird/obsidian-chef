import * as React from "react";
import {ListItem, ListCategory, ListFilters} from './components'
import {getData, setItem, deleteItem, setSettings} from './utils'
import {PluginData, Item, Settings, Category} from './types'

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

	const onChangeItem = (newItem: Item | Category, type: 'items' | 'categories') => {
		setItem({...data}, newItem, type).then((newData) => {
			setData(newData)
		})
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
		const categories: Category[] = [{id: -1, name: 'Uncategorised'}]
			.concat(data?.list.categories || [])

		return categories.map((category) => {
			const matchQuery = category.name.toLowerCase().includes(query.toLowerCase())
			const items = displayItems(category.id, matchQuery)

			// Hide empty categories when a search is on
			if (query && !matchQuery && !items.length) return null

			return <ListCategory
				key={`category-${category.id}`}
				category={category}
				itemLength={items.length}
				onChange={(category) => onChangeItem(category, 'categories')}
				onDropItem={(item) => onChangeItem(item, 'items')}
				onDelete={() => onDeleteItem(category.id, 'categories')}
			>
				{!category.isFolded && items}
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

		return items.map((item) => {
			return <ListItem
				key={`item-${item.id}`}
				item={item}
				moveCard={(item) => { console.log('move card', item)}}
				onChange={(item) => onChangeItem(item, 'items')}
				onDelete={() => onDeleteItem(item.id, 'items')}
			/>
		})
	}

	return (<>
		<h4>Obsidian Chef List</h4>

		<ListFilters
			query={query}
			settings={data.settings}
			onAddItem={(item, type) => {
				onChangeItem(item, type)
				setQuery('')
			}}
			onChangeQuery={setQuery}
			onChangeSettings={onChangeSettings}
		/>

		{showCategories && displayCategories()}
		{!showCategories && <>
			<h5 className="oc-list-category-name">Uncategorised</h5>
			{displayItems()}
		</>}

	</>)
};

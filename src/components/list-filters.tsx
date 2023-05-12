import * as React from 'react'
import {Settings, Item, Category} from '../types'
import {Checkbox, IconButton} from '../components'

type ListFiltersProps = {
	error?: string
	query: string
	settings: Settings
	onAddItem: (item: Item | Category, type: 'items' | 'categories') => void
	onChangeSettings: (newSettings: Settings) => void
	onChangeQuery: (query: string) => void
}

const getNewItem = (name: string) => { 
	return {name: name.trim(), ticked: false, quantity: 1, categoryId: -1, id: -1, order: -1}
}

export const ListFilters: React.FC<ListFiltersProps> = ({
	error = '',
	query,
	settings,
	onAddItem,
	onChangeSettings,
	onChangeQuery,
}) => {

	const onChangeFilter = (key: keyof Settings, value: boolean) => {
		onChangeSettings({...settings, [key]: value})
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter' && query.trim()) {
			onAddItem(getNewItem(query), 'items')
		}
	}

	return <>
		<div>
			<div>
				<Checkbox
					label="Display ticked items"
					value={settings.showTicked}
					onChange={(value) => onChangeFilter('showTicked', value)}
				/>
				<Checkbox
					label="Display unticked items"
					value={settings.showUnticked}
					onChange={(value) => onChangeFilter('showUnticked', value)}
				/>
				<Checkbox
					label="Display categories"
					value={settings.showCategories}
					onChange={(value) => onChangeFilter('showCategories', value)}
				/>
				<Checkbox
					label="Sort alphabetically items and categories"
					value={settings.sortAlphabetically}
					onChange={(value) => onChangeFilter('sortAlphabetically', value)}
				/>
				<Checkbox
					label="Put ticked items at the bottom of each category list"
					value={settings.sortByTickedItem}
					onChange={(value) => onChangeFilter('sortByTickedItem', value)}
				/>
			</div>

			<div className="oc-list-search">
				<input
					className="oc-list-search-input"
					name="search"
					type="text"
					placeholder="Search/add an item"
					value={query}
					onChange={(e) => onChangeQuery(e.target.value)}
					onKeyDown={onKeyDown}
				/>

				<IconButton
					// className="oc-list-search-add"
					name="add"
					disabled={!query.trim()}
					title="Add this item to your list"
					onClick={() => onAddItem(getNewItem(query), 'items')}
				/>

				<IconButton
					// className="oc-list-search-add"
					name="tag"
					disabled={!query.trim()}
					title="Add this category to your list"
					onClick={() => onAddItem({name: query, id: -1, order: -1}, 'categories')}
				/>
			</div>
			<p className="oc-list-search-error">{error}</p>
		</div>
	</>
}

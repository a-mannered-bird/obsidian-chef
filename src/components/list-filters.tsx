import * as React from 'react'
import {Settings, Item, Category} from '../types'
import {Checkbox, IconButton} from '../components'

type ListFilters = {
	query: string
	settings: Settings
	onAddItem: (item: Item | Category, type: 'items' | 'categories') => void
	onChangeSettings: (newSettings: Settings) => void
	onChangeQuery: (query: string) => void
}

export const ListFilters: React.FC<ListFilters> = ({
	query,
	settings,
	onAddItem,
	onChangeSettings,
	onChangeQuery,
}) => {

	const onChangeFilter = (key: keyof Settings, value: boolean) => {
		onChangeSettings({...settings, [key]: value})
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
			</div>

			<label className="oc-list-search-label" htmlFor="search">
				<strong></strong>
			</label>
			<div className="oc-list-search">
				<input
					className="oc-list-search-input"
					name="search"
					type="text"
					placeholder="Search/add an item"
					value={query}
					onChange={(event) => onChangeQuery(event.target.value)}
				/>

				<IconButton
					// className="oc-list-search-add"
					name="add"
					disabled={!query}
					title="Add this item to your list"
					onClick={() => onAddItem({name: query, ticked: false, quantity: 1, categoryId: -1, id: -1}, 'items')}
				/>

				<IconButton
					// className="oc-list-search-add"
					name="tag"
					disabled={!query}
					title="Add this category to your list"
					onClick={() => onAddItem({name: query, id: -1}, 'categories')}
				/>
			</div>
		</div>
	</>
}

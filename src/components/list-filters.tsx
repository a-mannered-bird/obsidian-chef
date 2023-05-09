import * as React from 'react'
import {Settings, Item} from '../types'
import {Checkbox} from '../components'

type ListFilters = {
	query: string
	settings: Settings
	onAddItem: (item: Item) => void
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

			<div className="oc-mg-top-10 oc-list-search" >
				<label className="oc-list-search-label" htmlFor="search">
					<strong>Search or add an item</strong>
				</label>

				<input
					className="oc-list-search-input"
					name="search"
					type="text"
					value={query}
					onChange={(event) => onChangeQuery(event.target.value)}
				/>

				<button
					className="oc-list-search-add"
					disabled={!query}
					title="Add this item to your list"
					onClick={() => onAddItem({name: query, ticked: false, quantity: 1, categoryId: -1, id: -1})}
				>
					+
				</button>
			</div>
		</div>
	</>
}

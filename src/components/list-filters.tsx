import * as React from 'react'
import {Settings} from '../types'
import {Checkbox} from '../components'

type ListFilters = {
	settings: Settings
	onChange: (newSettings: Settings) => void
}

export const ListFilters: React.FC<ListFilters> = ({
	settings,
	onChange,
}) => {
	const [query, setQuery] = React.useState('')

	const onChangeFilter = (key: keyof Settings, value: boolean) => {
		onChange({...settings, [key]: value})
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

			<div className="oc-mg-top-10" >
				<label htmlFor="search">
					<strong>Search or add an item</strong>
				</label>

				<input
					className="oc-list-search oc-mg-top-5"
					name="search"
					type="text"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
			</div>
		</div>
	</>
}

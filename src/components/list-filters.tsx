import * as React from 'react'
import {Settings} from '../types'

type CheckboxFilterProps = {
	label: string
	onChange: (value: boolean) => void
	value: boolean
}
export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
	label,
	onChange,
	value,
}) => {
	return <div className="checkbox-filter">
		<input type="checkbox" onChange={() => onChange(!value)} checked={value}/>
		<span>{label}</span>
	</div>
}

type ListFilters = {
	settings: Settings
	onChange: (newSettings: Settings) => void
}
export const ListFilters: React.FC<ListFilters> = ({
	settings,
	onChange,
}) => {

	const onChangeFilter = (key: keyof Settings, value: boolean) => {
		onChange({...settings, [key]: value})
	}

	return <>
		<div>
			<CheckboxFilter
				label="Display ticked items"
				value={settings.showTicked}
				onChange={(value) => onChangeFilter('showTicked', value)}
			/>
			<CheckboxFilter
				label="Display unticked items"
				value={settings.showUnticked}
				onChange={(value) => onChangeFilter('showUnticked', value)}
			/>
			<CheckboxFilter
				label="Display categories"
				value={settings.showCategories}
				onChange={(value) => onChangeFilter('showCategories', value)}
			/>
		</div>
	</>
}

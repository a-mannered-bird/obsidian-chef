import * as React from 'react'

type CheckboxProps = {
	label: string
	onChange: (value: boolean) => void
	value: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
	label,
	onChange,
	value,
}) => {
	return <div className="oc-checkbox">
		<input type="checkbox" onChange={() => onChange(!value)} checked={value}/>
		<span>{label}</span>
	</div>
}

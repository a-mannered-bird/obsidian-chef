import * as React from 'react'
import {calculateStringCh} from '../utils'
import {Icon, IconButton} from '.'

type EditableInputProps = {
	children: React.ReactNode,
	isEditable?: boolean
	onDelete: () => void,
	onValidate: (value: string) => void,
	value: string,
}

export const EditableInput: React.FC<EditableInputProps> = ({
	children,
	isEditable = true,
	onDelete,
	onValidate,
	value,
}) => {
	const [isEditing, setIsEditing] = React.useState(false)
	const [newValue, setNewValue] = React.useState(value)
	React.useEffect(() => {
		setNewValue(value)
	}, [value])

	const validate = () => {
		if (!newValue.trim()) return
		setIsEditing(false)
		onValidate(newValue.trim())
	}

	const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') validate()
		if (e.code === 'Escape') setIsEditing(false)
	}

  return <>
    {isEditing && isEditable ? 
			<input
				className="oc-editable-input"
				type="text"
				value={newValue}
				style={{width: `${calculateStringCh(newValue) + 1.5}ch`}}
				onChange={(event) => setNewValue(event.target.value)}
				onKeyDown={onInputKeyDown}
			/> : children
		}

		{!isEditing && isEditable && <Icon 
			className="oc-editable-input-edit"
			name="edit"
			size="18px"
			tabIndex={0}
			onClick={() => setIsEditing(true)}
			onKeyDown={(e) => {if (e.code === 'Enter') setIsEditing(true)}}
		/>}

		{isEditing && isEditable && <IconButton 
			className="oc-editable-input-validate"
			disabled={!newValue.trim()}
			name="tick"
			onClick={validate}
		/>}

		{isEditing && isEditable && <IconButton
			name="delete"
			onClick={onDelete}
		/>}
  </>;
}

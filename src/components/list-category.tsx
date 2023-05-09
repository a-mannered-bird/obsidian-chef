import * as React from 'react'
import {Icon, IconButton} from '.'
import {Category} from '../types'
import {capitalise} from '../utils'

type ListCategoryProps = {
	category: Category
	children: React.ReactNode,
	onChange: (newCategory: Category) => void
	onDelete: () => void
}

export const ListCategory: React.FC<ListCategoryProps> = ({
	category,
	children,
	onChange,
	onDelete,
}) => {
	const [isEditing, setIsEditing] = React.useState(false)

	return <>
		<div className="oc-category">
			{isEditing ? 
				<input
					type="text"
					value={category.name}
					onChange={(event) => onChange({...category, name: event.target.value})}
				/> : <h5 className="oc-list-category-name">{capitalise(category.name)}</h5>
			}

			{category.id !== -1 && <Icon
				className="oc-list-item-edit"
				name="edit"
				size="18px"
				onClick={() => setIsEditing(!isEditing)}
			/>}

			{isEditing && <IconButton
				className="oc-list-item-delete"
				name="delete"
				onClick={onDelete}
			/>}
		</div>
		{children}
	</>
}

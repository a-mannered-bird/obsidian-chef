import * as React from 'react'
import {Icon, IconButton} from '.'
import {Category, DnDTypes, Item} from '../types'
import {capitalise, css} from '../utils'
import { useDrop } from 'react-dnd'

type ListCategoryProps = {
	category: Category
	children: React.ReactNode,
	onChange: (newCategory: Category) => void
	onDropItem: (item: Item) => void
	onDelete: () => void
}

export const ListCategory: React.FC<ListCategoryProps> = ({
	category,
	children,
	onChange,
	onDropItem,
	onDelete,
}) => {
	const [isEditing, setIsEditing] = React.useState(false)

	const [{isOver}, drop] = useDrop(() => ({
		accept: DnDTypes.ITEM,
		drop: (item: Item) => {
			if (item.categoryId === category.id) {
				return
			}
			onDropItem({...item, categoryId: category.id})
		},
		collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
	}), [])

	const isCategorised = category.id !== -1
	const foldIconClasses = css({
		ocListCategoryFoldIcon: true,
		ocListCategoryFoldIconFolded: !category.isFolded,
	})
	const wrapperClasses = css({
		ocCategoryWrapper: true,
		ocCategoryWrapperIsOver: isOver,
	})

	return <div
		className={wrapperClasses}
		ref={(node) => drop(node)}
	>
		<div className="oc-category">
			{isCategorised && <span
				className={foldIconClasses}
				onClick={() => onChange({...category, isFolded: !category.isFolded})}
			>
				{'>'}
			</span>}

			{isEditing ? 
				<input
					type="text"
					value={category.name}
					onChange={(event) => onChange({...category, name: event.target.value})}
				/> : <h5 className="oc-list-category-name">{capitalise(category.name)}</h5>
			}

			{isCategorised && !isEditing && <Icon
				className="oc-list-item-edit"
				name="edit"
				size="18px"
				onClick={() => setIsEditing(!isEditing)}
			/>}

			{isEditing && <IconButton 
				className="oc-list-item-edit"
				name="tick"
				onClick={() => setIsEditing(false)}
			/>}

			{isEditing && <IconButton
				className="oc-list-item-delete"
				name="delete"
				onClick={onDelete}
			/>}
		</div>
		{children}
	</div>
}

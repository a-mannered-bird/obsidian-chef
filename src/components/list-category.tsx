import * as React from 'react'
import {EditableInput, Icon} from '.'
import {Category, DnDTypes, Item} from '../types'
import {capitalise, css} from '../utils'
import { useDrop } from 'react-dnd'

type ListCategoryProps = {
	category: Category
	children: React.ReactNode,
	itemLength: number
	onChange: (newCategory: Category) => void
	onDropItem: (item: Item) => void
	onDelete: () => void
}

export const ListCategory: React.FC<ListCategoryProps> = ({
	category,
	children,
	itemLength,
	onChange,
	onDropItem,
	onDelete,
}) => {

	const [{isOver, isOverCurrent}, drop] = useDrop(() => ({
		accept: DnDTypes.ITEM,
		drop: (item: Item, monitor) => {
			const didDrop = monitor.didDrop()
			if (item.categoryId === category.id || didDrop) {
				return
			}
			onDropItem({...item, categoryId: category.id})
		},
		collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
	}), [category.id, onDropItem])

	// Hide uncategorised category if it is empty

	const isCategorised = category.id !== -1
	if (!itemLength && !isCategorised) return null

	const foldIconClasses = css({
		ocListCategoryFoldIcon: true,
	})
	const wrapperClasses = css({
		ocCategoryWrapper: true,
		ocCategoryWrapperIsOver: isOver,
		ocCategoryWrapperIsOverCurrent: isOverCurrent,
		ocCategoryWrapperFolded: !!category.isFolded,
	})
	const onFold = () => onChange({...category, isFolded: !category.isFolded})

	return <div
		className={wrapperClasses}
		ref={(node) => drop(node)}
	>
		<div className="oc-category">
			{isCategorised && <Icon 
				className={foldIconClasses}
				onClick={onFold}
				tabIndex={0}
				onKeyDown={(e) => {if (e.code === 'Enter') onFold()}}
				name="arrow"
				size="16px"
			/>}

			<EditableInput
				isEditable={isCategorised}
				onDelete={onDelete}
				onValidate={(name) => onChange({...category, name})}
				value={category.name}
			>
				<h5 className="oc-list-category-name">{capitalise(category.name)}</h5>
			</EditableInput>
		</div>

		{!category.isFolded && !itemLength && <p>
			No items found in this category
		</p>}

		{!category.isFolded && children}
	</div>
}

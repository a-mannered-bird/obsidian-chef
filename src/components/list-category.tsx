import * as React from 'react'
import {EditableInput, Icon} from '.'
import {Category, DnDTypes, Item} from '../types'
import {capitalise, css} from '../utils'
import { useDrag, useDrop } from 'react-dnd'

type ListCategoryProps = {
	canDrag: boolean
	category: Category
	children: React.ReactNode,
	itemLength: number
	onChange: (newCategory: Category) => void
	onDropItem: (item: Item) => void
	onDelete: () => void
}

export const ListCategory: React.FC<ListCategoryProps> = ({
	canDrag,
	category,
	children,
	itemLength,
	onChange,
	onDropItem,
	onDelete,
}) => {

	const [{isDragging}, drag] = useDrag(
		() => ({
			canDrag,
			type: DnDTypes.CATEGORY,
			category,
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[category, canDrag],
	)

	const [{itemIsOver, itemIsOverCurrent, categoryIsOver}, drop] = useDrop(() => ({
		accept: [DnDTypes.ITEM, DnDTypes.CATEGORY],
		drop: (item: Item | Category, monitor) => {
			const didDrop = monitor.didDrop()
			if (didDrop) {
				return
			}
			if ("categoryId" in item) {
				onDropItem({...item})
			}
		},
		collect: (monitor) => {
			const isItem = monitor.getItemType() === DnDTypes.ITEM
			const isCategory = monitor.getItemType() === DnDTypes.CATEGORY
			return {
				itemIsOver: monitor.isOver() && isItem,
				itemIsOverCurrent: monitor.isOver({ shallow: true }) && isItem,
				categoryIsOver: monitor.isOver() && isCategory,
			}
		},
	}), [category, onDropItem])

	// Hide uncategorised category if it is empty

	const isCategorised = category.id !== -1
	if (!itemLength && !isCategorised) return null

	const foldIconClasses = css({
		ocListCategoryFoldIcon: true,
	})
	const wrapperClasses = css({
		ocCategoryWrapper: true,
		ocCategoryWrapperCanDrag: canDrag,
		ocCategoryWrapperIsOver: itemIsOver && !isDragging,
		ocCategoryWrapperIsOverCurrent: itemIsOverCurrent && !isDragging,
		ocCategoryWrapperFolded: !!category.isFolded,
	})
	const onFold = () => onChange({...category, isFolded: !category.isFolded})

	return <div
		className={wrapperClasses}
		ref={(node) => drag(drop(node))}
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

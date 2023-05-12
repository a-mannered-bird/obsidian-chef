import * as React from 'react'
import {EditableInput} from '.'
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

	// Hide uncategorised category if it is empty

	const isCategorised = category.id !== -1
	if (!itemLength && !isCategorised) return null

	const foldIconClasses = css({
		ocListCategoryFoldIcon: true,
		ocListCategoryFoldIconFolded: !category.isFolded,
	})
	const wrapperClasses = css({
		ocCategoryWrapper: true,
		ocCategoryWrapperIsOver: isOver,
	})
	const onFold = () => onChange({...category, isFolded: !category.isFolded})

	return <div
		className={wrapperClasses}
		ref={(node) => drop(node)}
	>
		<div className="oc-category">
			{isCategorised && <span
				className={foldIconClasses}
				onClick={onFold}
				tabIndex={0}
				onKeyDown={(e) => {if (e.code === 'Enter') onFold()}}
			>
				{'>'}
			</span>}

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

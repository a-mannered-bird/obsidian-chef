import * as React from 'react'
import {Category} from '../types'
import {capitalise} from '../utils'

type ListCategoryProps = {
	category: Category
	children: React.ReactNode,
}

export const ListCategory: React.FC<ListCategoryProps> = ({
	category,
	children,
}) => {
	return <>
		<h5 className="oc-list-category-name">{capitalise(category.name)}</h5>
		{children}
	</>
}

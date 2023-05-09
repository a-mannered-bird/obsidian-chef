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
	return <div>
		<h5>{capitalise(category.name)}</h5>
		{children}
	</div>
}

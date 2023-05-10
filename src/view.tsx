import { ItemView, WorkspaceLeaf } from 'obsidian'
import * as React from 'react'
import { ListApp } from './list-app'
import { createRoot, Root } from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const VIEW_TYPE = 'OBSIDIAN_CHEF_VIEW'

export class ListView extends ItemView {
	private root: Root | null = null

	constructor(leaf: WorkspaceLeaf) {
		super(leaf)
	}

	getViewType() {
		return VIEW_TYPE
	}

	getDisplayText() {
		return 'Obsidian Chef List'
	}

	async onOpen() {
		this.icon = 'checkbox-glyph'
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<React.StrictMode>
				<DndProvider backend={HTML5Backend}>
					<ListApp />
				</DndProvider>
			</React.StrictMode>
		)
	}

	async onClose() {
		if (this.root) {
			this.root.unmount()
		}
	}
}

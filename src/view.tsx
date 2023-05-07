import { ItemView, WorkspaceLeaf } from 'obsidian'
import * as React from 'react'
import { ListApp } from './ListApp'
import { createRoot, Root } from 'react-dom/client'

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
		return 'Example view'
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <React.StrictMode>
        <ListApp />
      </React.StrictMode>
    )
	}

	async onClose() {
    if (this.root) {
      this.root.unmount()
    }
	}
}

import { ItemView, WorkspaceLeaf } from 'obsidian'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ReactView } from './ReactView'
import { createRoot } from 'react-dom/client'

export const VIEW_TYPE = 'OBSIDIAN_CHEF_VIEW'

export class ListView extends ItemView {
	private root: HTMLElement | null = null

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
		this.root = createDiv()
    this.containerEl.appendChild(this.root)
    const root = createRoot(this.root)
    root.render(
      <React.StrictMode>
        <ReactView />
      </React.StrictMode>
    )
	}

	async onClose() {
    if (this.root) {
			console.log(this.root);
      ReactDOM.unmountComponentAtNode(this.root);
      this.root.remove()
      this.root = null
    }
	}
}

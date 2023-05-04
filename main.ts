import {Plugin} from 'obsidian'
import { ListView, VIEW_TYPE } from './view'

// Remember to rename these classes and interfaces!


export default class MyPlugin extends Plugin {
	async onload() {
		console.log('loading')

		this.registerView(
			VIEW_TYPE,
			(leaf) => new ListView(leaf)
    )

		this.addCommand({
			id: "open-view",
			name: "Open List View",
			callback: () => {
				if (this.viewExists()) {
					this.addListView();
				} else {
					// TODO -> Diplay the view
					// this.app.workspace.revealLeaf(this.view.leaf);
				}
			}
		});

		this.addListView()

		this.registerMarkdownCodeBlockProcessor(
      'ingredient',
      async (source, el, ctx) => {
				const buttonHtml = '<button class="my-button">Add to list</button>'
        el.innerHTML = buttonHtml
      }
    )
	}

	viewExists () {
		return this.app.workspace.getLeavesOfType(VIEW_TYPE).length
	}

	async addListView() {
		if (this.viewExists()) {
			return;
		}
		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE
		});
	}

	onunload() {
		console.log('Unloading')
		this.app.workspace.detachLeavesOfType(VIEW_TYPE)
	}

}

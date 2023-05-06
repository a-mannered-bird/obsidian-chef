import {PluginData} from '../types'

export default JSON.stringify({
	"list": {
		"categoriesCount": 1,
		"categories": [
			{
				"id": 1,
				"name": "vegetable",
			},
		],
		"itemsCount": 1,
		"items": [
			{
				"id": 1,
				"name": "avocado",
				"category": 1,
				"quantity": 1,
				"ticked": false,
			},
		],
	},
} as PluginData)

// TODO: Uncomment when app is ready
// export default JSON.stringify({
// 	"list": {
// 		"categoriesCount": 0,
// 		"categories": [],
// 		"itemsCount": 0,
// 		"items": [],
// 	},
// } as PluginData)

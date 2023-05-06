import {PluginData} from '../types'

export default JSON.stringify({
	"list": {
		"categoriesCount": 2,
		"categories": [
			{
				"id": 1,
				"name": "vegetable",
			},
			{
				"id": 2,
				"name": "fruit",
			},
		],
		"itemsCount": 2,
		"items": [
			{
				"id": 1,
				"name": "avocado",
				"category": 1,
				"quantity": 1,
				"ticked": false,
			},
			{
				"id": 2,
				"name": "apple",
				"category": 2,
				"quantity": 3,
				"ticked": false,
			},
			{
				"id": 3,
				"name": "g potatoes",
				"category": 1,
				"quantity": 500,
				"ticked": true,
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

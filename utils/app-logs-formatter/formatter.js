// Add parent log file as parent.json
// Add child log file as child.json
// Make sure the files only have the object. Extra values from top and bottom need to removed.
// The output will be in parent_formatted.json and child_formatted.json
// To run, simply run node formatter.js in the console in current directory

const fs = require("fs");
const path = require("path");

const inputParentFilePath = path.join(__dirname, "parent.json");
const inputChildFilePath = path.join(__dirname, "child.json");

const outputParentFilePath = path.join(__dirname, "parent_formatted.json");
const outputChildFilePath = path.join(__dirname, "child_formatted.json");

fs.readFile(inputParentFilePath, "utf8", (err, parentData) => {
	if (err) {
		console.error(`Error reading input parent file.`);
		return;
	}

	const data = JSON.parse(parentData);
	const formattedParentObj = parseNestedJsonStrings(data);

	fs.writeFile(
		outputParentFilePath,
		JSON.stringify(formattedParentObj, null, 4),
		"utf8",
		(err) => {
			if (err) {
				console.error("Error writing updated parent JSON file:", err);
				return;
			}
			console.log("Updated parent saved to", outputParentFilePath);
		}
	);
});

fs.readFile(inputChildFilePath, "utf8", (err, parentData) => {
	if (err) {
		console.error(`Error reading input child file.`);
		return;
	}

	const data = JSON.parse(parentData);
	const formattedChildObj = parseNestedJsonStrings(data);

	fs.writeFile(
		outputChildFilePath,
		JSON.stringify(formattedChildObj, null, 4),
		"utf8",
		(err) => {
			if (err) {
				console.error("Error writing updated child JSON file:", err);
				return;
			}
			console.log("Updated child saved to", outputChildFilePath);
		}
	);
});

const parseNestedJsonStrings = (data) => {
	const parseObject = (obj) => {
		if (obj !== null && typeof obj === "object") {
			for (const key in obj) {
				if (typeof obj[key] === "string") {
					try {
						const parsedValue = JSON.parse(obj[key]);
						obj[key] = parseObject(parsedValue);
					} catch (e) {
            // TODO: fix this. Commenting because throws error for non-object string fields.
						// console.error(`Parsing error: ${e}`);
					}
				} else if (typeof obj[key] === "object") {
					obj[key] = parseObject(obj[key]);
				}
			}
		}
		return obj;
	};

	return parseObject(data);
};

// function parseNestedJson(obj) {
// 	if (obj && typeof obj === "object") {
// 		if (Array.isArray(obj)) {
// 			return obj.map((item) => parseNestedJson(item));
// 		} else {
// 			for (const key in obj) {
// 				if (obj.hasOwnProperty(key)) {
// 					if (typeof obj[key] === "string") {
// 						try {
// 							const parsed = JSON.parse(obj[key]);
// 							if (parsed && typeof parsed === "object") {
// 								obj[key] = parseNestedJson(parsed);
// 							}
// 						} catch (e) {
// 							console.error(`Error: ${e} occurred.`);
// 						}
// 					} else if (typeof obj[key] === "object") {
// 						obj[key] = parseNestedJson(obj[key]);
// 					}
// 				}
// 			}
// 		}
// 	}
// 	return obj;
// }

// const formatData = (data) => {
//   return data.map(entry => {
//       // Parse the `log` field to a JavaScript object
//       const parsedLog = JSON.parse(entry.log);

//       // Convert the `settingMetaData` field in the `log` field to an object
//       parsedLog.settingMetaData = JSON.parse(parsedLog.settingMetaData);

//       // Return the updated entry with formatted `log`
//       return {
//           ...entry,
//           log: parsedLog
//       };
//   });
// };

// const parseNewNestedJsonStrings = (data) => {
//   // Helper function to recursively parse JSON strings
//   const parseObject = (obj) => {
//       // Check if the input is an object
//       if (obj !== null && typeof obj === 'object') {
//           // Iterate over the keys of the object
//           for (const key in obj) {
//               // If the value is a string, try parsing it as JSON
//               if (typeof obj[key] === 'string') {
//                   try {
//                       const parsedValue = JSON.parse(obj[key]);
//                       // If parsing is successful, recursively process the parsed value
//                       obj[key] = parseObject(parsedValue);
//                   } catch (e) {
//                       // If JSON parsing fails, leave the value as it is
//                   }
//               } else if (typeof obj[key] === 'object') {
//                   // Recursively process nested objects and arrays
//                   obj[key] = parseObject(obj[key]);
//               }
//           }
//       }
//       return obj;
//   };

//   // Start parsing the input data
//   console.log(`DATA: ${typeof data}`);
//   return data.map(entry => parseObject(entry));
// };

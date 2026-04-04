---
name: SearchAndResumeNugetPackage
description: Search and resume the nuget package of a skill and how to use it.
allowed-tools: Bash(playwright-cli:*)
---

# Search page

Search for folder name on the current v2/rscg_examples. 
After you find the folder, read the description.json inside the folder to get the name of the article and the link to it.

Read also all C# files in the src folder to get how it is used and extract the most relevant information about it.


## Steps

1. Use powershell to search for folders in the current v2/rscg_examples directory that match the user's query. You can use `Get-ChildItem` with the `-Recurse` flag to search through all subdirectories.
2. If there is no matching folder, inform the user that no results were found and suggest trying a different query.
2. If there are multiple matching folders, list them and ask the user to select one or more of them to proceed with.
3. If there is a single folder, look for a `description.json` file inside it. If found, read the JSON file to understand the what it does.
4. Use Powershell eval to extract nuget URL from the description.json file. 
5. Use playwright-cli to open the nuget URL in a browser and extract the article title and URL from the page. You can use `playwright-cli eval` to run JavaScript on the page to find the relevant elements containing the article information.
6. Read the src folder inside the found folder to find all C# files. Extract relevant information about how the skill is used from these files, such as method names, parameters, and comments.
5. Compile a summary of the skill based on the description and the information extracted from the C# files. This summary should include the purpose of the skill, how to use it, and any important details or caveats.
7. Show the summary and offer to  copy the summary to the clipboard with Powershell Set-Clipboard.

## Output format

Return results as a numbered list:

```
Summary of the skill:
```

## Notes

- Make sure to handle cases where the `description.json` file is missing or does not contain the expected information gracefully, providing appropriate feedback to the user.
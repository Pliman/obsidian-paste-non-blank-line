# Paste Non Blank Line Obsidian Plugin

[中文文档](./README_CN.md)

## Description

This plugin aims to solve the problem of excessive blank lines when copying text from AI assistants (like ChatGPT, Claude, etc.) or other sources and pasting it into Obsidian. These AI platforms often add extra blank lines within paragraphs or between list items for better online readability, which can appear redundant in notes.

This plugin provides a command to clean up these extra blank lines in pasted or selected text, making the notes cleaner. **It removes _all_ blank lines.**

**Example:**

**Original Text (possibly from AI):**

```markdown
- **Be Proactive**

  - Take initiative in life, don't be controlled by emotions or external influences.

  - Highly effective people take responsibility, rather than blaming the environment or others.

- **Begin with the End in Mind**

  - Set clear life goals or visions, and align all actions with long-term objectives.

  - Be goal-oriented in work as well, avoid aimless busyness.
```

**After processing with this plugin's command:**

```markdown
- **Be Proactive**
  - Take initiative in life, don't be controlled by emotions or external influences.
  - Highly effective people take responsibility, rather than blaming the environment or others.
- **Begin with the End in Mind**
  - Set clear life goals or visions, and align all actions with long-term objectives.
  - Be goal-oriented in work as well, avoid aimless busyness.
```

## User Experience

To avoid automatically modifying pasted content when the user might not want it (e.g., pasting poetry or code), this plugin uses a **command trigger** method instead of automatically listening to paste events.

1.  **Register Command:** The plugin registers a command named "Clean Extra Blank Lines".
2.  **Usage:**
    - **Paste and Clean:** After copying text, execute this command directly in Obsidian. The plugin will read the clipboard content, clean it, and then insert it at the cursor position.
    - **Clean Existing Content:** First, paste the text normally using `Ctrl+V` (or `Cmd+V`), then select the area that needs cleaning, and execute the command. The plugin will clean the selected text.
3.  **Hotkey:** It is recommended that users set a convenient and non-conflicting hotkey (e.g., `Ctrl+Alt+V`) for the "Clean Extra Blank Lines" command in Obsidian's `Settings -> Hotkeys`.

## Architecture

The plugin follows the standard Obsidian API and project structure:

- `main.ts`: Main plugin logic, contains the `Plugin` subclass.
  - `onload()`: Registers the cleanup command.
  - `onunload()`: Unregisters the command.
  - `processText(text: string): string`: Implements the core cleanup algorithm.
  - Command callback function: Gets text (from clipboard or selection), calls `processText`, updates the editor content.
- `manifest.json`: Defines plugin metadata (ID: `paste-non-blank-line`, Author: `Pliman`, etc.).
- `README.md`: This document.
- `package.json`, `tsconfig.json`, `.gitignore`: Standard development files.

## Core Algorithm

The core idea of the cleanup logic is: **Remove _all_ blank lines.**

1.  **Get Input:** Get the string from the clipboard or the current selection.
2.  **Split by Line:** Split the string into an array of lines using the newline character (`\n`).
3.  **Iterate and Process:**
    - Initialize an empty result line array `resultLines`.
    - Iterate through the input line array:
      - Check if the current line is blank (`line.trim() === ''`).
      - **If not blank:** Add this line to `resultLines`.
4.  **Join Output:** Join all lines in `resultLines` back into a single string using the newline character (`\n`).
5.  **Apply Result:** Insert the processed string into the editor or replace the selection.

This algorithm removes all lines that contain only whitespace.

## Installation

(Standard Obsidian plugin installation instructions to be added later, e.g., via BRAT or the community plugin market)

**Important:** When installing, ensure the folder created under `.obsidian/plugins/` is named `paste-non-blank-line`.

## Configuration

- **Hotkey:** Please search for the command "Clean Extra Blank Lines" in Obsidian's `Settings -> Hotkeys` and assign your preferred hotkey.

## TODOs

- Add setting options to allow users to configure the definition of a "blank line" (e.g., whether lines containing only spaces are considered blank).
- Add special handling rules for specific Markdown structures (like code blocks).

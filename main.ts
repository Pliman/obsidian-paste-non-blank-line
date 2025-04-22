import {
  Plugin,
  Editor,
  MarkdownView,
  Notice,
  MarkdownFileInfo,
} from "obsidian";

export default class PasteNonBlankLinePlugin extends Plugin {
  async onload() {
    console.log("Loading Paste Non Blank Line plugin");

    this.addCommand({
      id: "clean-extra-blank-lines",
      name: "Clean Extra Blank Lines",
      editorCallback: async (
        editor: Editor,
        ctx: MarkdownView | MarkdownFileInfo
      ) => {
        const selection = editor.getSelection();
        let textToProcess = "";

        if (selection) {
          // Process selected text
          textToProcess = selection;
          const processedText = this.processText(textToProcess);
          editor.replaceSelection(processedText);
          new Notice("Selected text cleaned.");
        } else {
          // If no selection, try reading from clipboard
          try {
            const clipboardText = await navigator.clipboard.readText();
            if (clipboardText) {
              textToProcess = clipboardText;
              const processedText = this.processText(textToProcess);
              editor.replaceSelection(processedText);
              new Notice("Pasted and cleaned text from clipboard.");
            } else {
              new Notice("Clipboard is empty or contains no text.");
            }
          } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
            new Notice("Failed to read clipboard. See console for details.");
          }
        }
      },
    });
  }

  onunload() {
    console.log("Unloading Paste Non Blank Line plugin");
  }

  processText(text: string): string {
    const lines = text.split("\n");
    const resultLines: string[] = [];

    for (const line of lines) {
      if (line.trim() !== "") {
        resultLines.push(line);
      }
    }

    return resultLines.join("\n");
  }
}

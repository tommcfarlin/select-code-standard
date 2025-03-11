# PHP Code Standard Selector

Easily switch between PHP coding standards in VS Code. Integrates with PHP_CodeSniffer to provide quick access to all installed coding standards.

## Features

- 🔄 Quick switching between PHP coding standards (PSR-12, WordPress, etc.)
- 🔍 Automatic detection of installed standards
- 📊 Status bar indicator showing current standard
- ⚡️ Keyboard shortcut support
- 🔌 Integration with PHP Sniffer & Beautifier

![Feature Preview](images/feature-preview.gif)

## Requirements

- PHP 8.2 or higher
- PHP_CodeSniffer (`phpcs`) installed globally or locally
- [PHP Sniffer & Beautifier](https://marketplace.visualstudio.com/items?itemName=valeryanm.vscode-phpsab) VS Code extension

## Installation

1. Open VS Code
2. Press `Cmd+P` to open the Quick Open dialog
3. Type `ext install tommcfarlin.code-standard-selector`
4. Press Enter

## Usage

1. Open a PHP file
2. Click the coding standard indicator in the status bar (or use `Cmd+Alt+S`)
3. Select your preferred coding standard from the list

### Commands

- `Select Code Standard`: Choose a PHP coding standard (Command Palette or status bar)

### Keyboard Shortcuts

- macOS: `Cmd+Alt+S`
- Windows/Linux: `Ctrl+Alt+S`

## Extension Settings

This extension contributes the following settings:

- `phpsab.standard`: The selected PHP coding standard
- `phpsab.executablePathCS`: Path to PHPCS executable

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

### Development

```bash
git clone https://github.com/yourusername/code-standard-selector.git
cd code-standard-selector
npm install
code .
```

Press `F5` to start debugging the extension.

### Running Tests

```bash
npm test
```

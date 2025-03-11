const assert = require('assert');
const vscode = require('vscode');

suite('Extension Test Suite', () => {
    let extensionContext;

    suiteSetup(async () => {
        // Get the extension
        const extension = vscode.extensions.getExtension('tommcfarlin.code-standard-selector');

        // Activate the extension and store the exports
        extensionContext = await extension.activate();

        // Create and show PHP document to trigger activation
        const document = await vscode.workspace.openTextDocument({
            content: '<?php\n',
            language: 'php'
        });
        await vscode.window.showTextDocument(document);

        // Give VS Code a moment to activate the extension
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    test('Extension should be present', () => {
        const extension = vscode.extensions.getExtension('tommcfarlin.code-standard-selector');
        assert.ok(extension);
    });

    test('Should check dependencies', async () => {
        const extension = vscode.extensions.getExtension('tommcfarlin.code-standard-selector');
        assert.ok(extension.isActive);
    });

    test('Should have status bar item', async () => {
        assert.ok(extensionContext.statusBarItem, 'Status bar item not found');
        assert.strictEqual(extensionContext.statusBarItem.command, 'extension.selectCodeStandard');
    });

    test('Should show correct status bar text', async () => {
        const config = vscode.workspace.getConfiguration('phpsab');
        const currentStandard = config.get('standard') || 'No Standard';
        assert.strictEqual(
            extensionContext.statusBarItem.text,
            `$(law) ${currentStandard}`
        );
    });

    test('Should have correct tooltip', async () => {
        const config = vscode.workspace.getConfiguration('phpsab');
        const currentStandard = config.get('standard') || 'None Selected';
        assert.strictEqual(
            extensionContext.statusBarItem.tooltip,
            `PHP Coding Standard: ${currentStandard}`
        );
    });

    test('Should detect installed standards', async () => {
        const extension = vscode.extensions.getExtension('tommcfarlin.code-standard-selector');
        const { getInstalledStandards } = extension.exports;
        const standards = await getInstalledStandards();
        assert.ok(Array.isArray(standards));
    });

    test('Should show default standard', async () => {
        const config = vscode.workspace.getConfiguration('phpsab');
        const defaultStandard = 'PSR12';
        assert.strictEqual(
            extensionContext.statusBarItem.text,
            `$(law) ${defaultStandard}`
        );
    });
});
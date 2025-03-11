const vscode = require('vscode');
const { exec } = require('child_process');
const util = require('util');
const fs = require('fs').promises;
const execPromise = util.promisify(exec);

/** @type {vscode.StatusBarItem|undefined} Status bar item for displaying current standard */
let statusBarItem;

/**
 * Updates the status bar with the current PHP coding standard
 * @async
 * @returns {Promise<void>}
 */
async function updateStatusBar() {
    const config = vscode.workspace.getConfiguration('phpsab');
    const currentStandard = config.get('standard');

    if (statusBarItem) {
        statusBarItem.text = `$(law) ${currentStandard || 'No Standard'}`;
        statusBarItem.tooltip = `PHP Coding Standard: ${currentStandard || 'None Selected'}`;
    }
}

/**
 * Checks if required dependencies (PHPSab extension and PHPCS/PHPCBF) are installed
 * @async
 * @returns {Promise<boolean>} True if all dependencies are found, false otherwise
 */
async function checkDependencies() {
    const phpsabExtension = vscode.extensions.getExtension('valeryanm.vscode-phpsab');

    if (!phpsabExtension) {
        const action = await vscode.window.showErrorMessage(
            'PHP Sniffer & Beautifier extension is required.',
            'Install Extension'
        );

        if (action === 'Install Extension') {
            await vscode.commands.executeCommand(
                'vscode.open',
                vscode.Uri.parse('vscode:extension/valeryanm.vscode-phpsab')
            );
        }
        return false;
    }

    const config = vscode.workspace.getConfiguration('phpsab');
    const executablePathCS = config.get('executablePathCS');
    const executablePathCBF = config.get('executablePathCBF');

    try {
        await fs.access(executablePathCS);
        await fs.access(executablePathCBF);
        return true;
    } catch (error) {
        vscode.window.showErrorMessage('PHPCS/PHPCBF executables not found.');
        return false;
    }
}

/**
 * Retrieves list of installed PHP coding standards from PHPCS
 * @async
 * @returns {Promise<string[]>} Array of installed coding standard names
 */
async function getInstalledStandards() {
    try {
        const { stdout } = await execPromise('phpcs -i');
        const match = stdout.match(/The installed coding standards are (.*)/);
        return match && match[1] ? match[1].split(',').map(standard => standard.trim()) : [];
    } catch (error) {
        return [];
    }
}

/**
 * Activates the extension
 * @param {vscode.ExtensionContext} context The extension context
 * @returns {Object} Object containing exported functionality
 * @property {vscode.StatusBarItem} statusBarItem The status bar item
 * @property {Function} getInstalledStandards Function to get installed standards
 * @property {Function} checkDependencies Function to check dependencies
 */
function activate(context) {
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.command = 'extension.selectCodeStandard';
    context.subscriptions.push(statusBarItem);

    updateStatusBar();
    statusBarItem.show();

    let phpWatcher = vscode.workspace.onDidOpenTextDocument(document => {
        if (document.languageId === 'php') {
            checkDependencies().then(dependenciesOk => {
                if (dependenciesOk) {
                    updateStatusBar();
                }
            });
        }
    });

    context.subscriptions.push(phpWatcher);

    let disposable = vscode.commands.registerCommand('extension.selectCodeStandard', async function () {
        try {
            if (!await checkDependencies()) {
                return;
            }

            const standards = await getInstalledStandards();
            if (standards.length === 0) {
                vscode.window.showErrorMessage('No PHP coding standards found. Is PHPCS installed?');
                return;
            }

            const standard = await vscode.window.showQuickPick(standards, {
                placeHolder: 'Select a coding standard'
            });

            if (standard) {
                const config = vscode.workspace.getConfiguration('phpsab');
                await config.update('standard', standard, true);
                vscode.window.showInformationMessage(`Coding standard updated to: ${standard}`);
                await updateStatusBar();
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to update coding standard: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);

    return {
        statusBarItem,
        getInstalledStandards,
        checkDependencies
    };
}

/**
 * Deactivates the extension
 * @returns {void}
 */
function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
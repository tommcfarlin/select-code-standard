# Change Log

All notable changes to the "PHP Code Standard Selector" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-11

### Added
- Initial release
- Status bar indicator showing current PHP coding standard
- Quick pick menu for selecting coding standards
- Automatic detection of installed PHP_CodeSniffer standards
- Keyboard shortcut support (Cmd+Alt+S on macOS, Ctrl+Alt+S on Windows/Linux)
- Integration with PHP Sniffer & Beautifier extension
- Dependency checking for required components
- Configuration options for PHPCS executable path
- Default PSR-12 coding standard support

### Changed
- Updated configuration namespace to avoid conflicts with PHP Sniffer & Beautifier

### Fixed
- Proper error handling for missing PHPCS executable
- Status bar updates when switching PHP files
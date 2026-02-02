# TechFlow Content Repository

This repository contains the front-end code and content files for TechFlow, a project management tool.

## Getting started

1. Clone the repository: `git clone [url]`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open http://localhost:5173 in your browser

## Project structure

- `content/` - Localization files organized by language
  - `en/` - English strings (source language)
  - `de/` - German translations
- `src/` - Application source code
  - `components/` - React components
- `docs/` - Team documentation
  - `content-guidelines.md` - Terminology and voice/tone rules
  - `string-management.md` - Process for managing content changes

## Content files

Localization files are in JSON format, organized by feature area:

| File | Content |
|------|---------|
| `common.json` | Navigation, shared actions, empty states |
| `notifications.json` | Notification messages and actions |
| `onboarding.json` | New user onboarding flow |
| `errors.json` | Error messages across the product |
| `checkout.json` | Upgrade/billing flow |
| `settings.json` | Account settings |

## Making content changes

See `docs/string-management.md` for the team's process for content changes.

## Submitting your final project

1. **Clone this repository** to your computer so you can explore it locally and run the application
2. **Explore and audit** using the running app, the terminal, and AI tools
3. **Create a branch** on GitHub's website (click the branch dropdown, type a name, press Enter)
4. **Edit files** through GitHub's web editor on your branch (click the pencil icon on any file)
5. **Open a pull request** from your branch to main and fill in the PR template
6. **Copy the PR link** and submit it through the course platform along with your written analysis

## Languages

TechFlow currently supports English (en) and German (de). English is the source language. All content changes should be made in English first, then translated.

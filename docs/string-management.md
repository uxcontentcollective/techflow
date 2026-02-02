# String Management Process

## How content changes work at TechFlow

### For localized strings (in content/ folder)

1. Create a branch from main
2. Edit the relevant JSON file in `content/en/`
3. Write a clear commit message explaining what changed and why
4. Open a pull request using the PR template
5. Request review from a content lead and an engineer
6. After approval, merge to main
7. Changes ship with the next deployment (Wednesdays)

### For hardcoded strings (in src/components/)

Hardcoded strings require engineering work to extract into localization files. If you find a hardcoded string that should be localized:

1. Document the string, its location, and why it should be extracted
2. File an issue or add it to your PR description as a flagged item
3. Engineering will scope the extraction work separately

### Translation process

- English is the source language
- German translations are managed by an external vendor
- Translation batches run bi-weekly (every other Thursday)
- New strings need context: screenshots, descriptions, character limits
- Submit translation requests at least 3 business days before the batch deadline

### Deployment schedule

- Production deploys happen every Wednesday at 10:00 AM UTC
- Code freeze: Tuesday 5:00 PM UTC
- PRs must be merged before the freeze to be included in the Wednesday deploy
- Hotfixes for critical issues can bypass the schedule (engineering approval required)

# TechFlow Content Guidelines

## Voice and tone

TechFlow's voice is clear, helpful, and professional. We avoid jargon, use plain language, and write for busy professionals who want to get things done.

### Tone by context

- **Success states**: Warm and brief. Confirm what happened without being over-enthusiastic.
- **Error states**: Calm and helpful. Tell the user what went wrong and what they can do about it. No exclamation marks in error messages.
- **Empty states**: Encouraging but not pushy. Suggest a next step.
  - *Example: "You don't have any workspaces yet. Create one to get started."*
- **Instructional text**: Direct and scannable. Use short sentences.

## Terminology

Consistent terminology across the product. Use these terms:

| Use this | Not this |
|----------|----------|
| Project | Workspace, board, space |
| Task | To-do, item, ticket |
| Team member | User, collaborator, member |
| Sign in | Log in, login |
| Sign out | Log out, logout |

## Formatting

- Use sentence case for all UI text (capitalize first word only)
- No periods on button labels
- Periods on complete sentences in descriptions and body text
- No exclamation marks in error states or system messages
- Exclamation marks acceptable (sparingly) in success states and celebrations

## Placeholders

- Use camelCase for placeholder variables: `{userName}`, `{projectName}`, `{taskName}`
- Always include the variable type in the name for clarity
- Provide fallback text for cases where the variable might be empty

## Action labels

- Keep action labels consistent across similar interactions
- If multiple notifications link to a project, they should all use the same action label
- Preferred: "View [thing]" pattern (e.g., "View project", "View task")

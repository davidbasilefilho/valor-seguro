# Project specification
_**IMPORTANT!!!!! Do as said in the spec.**_
## Idea
It is a software for managing finances for individuals with graphs for tracking weekly, monthly and yearly expenses, and keep control of them with budgets.

## Stories
- As a user, I would like to insert and remove expenses, with a lable, description, date and tags.
- As a user, I would like to insert and remove earnings, with a lable, description, date and tags.
- As a user, I would like to have general control over budgets for different aspects of my financial life, e.g. food, clothes, life goals, etc.
- As a user, I would like to create and remove tags for expenses, earnings and budgets.
- As a user, I would like to use the same tags for different usages, e.g., food tag for both expenses, earnings and budgets at the same time.
- As a user, I would like to sort expenses, earnings and budgets by lable, description or date.
- As a user, I would like to filter expenses, earnings and budgets by tags and dates.
- As a user, I would like to see graphs illustrating my earnings and expenses vs budgets, weekly, monthly and yearly.
- As a user, I would like to see graphs illustrating my earnings, expenses and budgets across different tags.

## Technology Stack
- Bun 1.2 for building.
- Next.js 15
- TailwindCSS 4 for styling
- Zod 3 for validation
- React 19
- Zustand 5 for state management
- shadcn/ui
- Supabase
- Tanstack Query (@tanstack/react-query) for async state management

## Programming standards
- Minimal code: only comment when strictly necessary.
- Readability: emphasize readability.
- Use React components from src/components. Mix and match and modify if needed.
- Prefer Zustand over from the standard React state. Only use React state if absolutely needed.
- All text displayed to the user MUST at all times be in Brazilian Portuguese.
- All fetches and mutations to Supabase MUST be done with Tanstack Query.
- Supabase types are at /database.types.ts
- The realtime Supabase tables are: `budget`, `budget_tags`, `tag`, `transaction` and `transaction_tags`
  - The tables: `users` and `transaction_types` are not realtime tables, you will have to refetch the data once changed.
- To subscribe to realtime events use:
```typescript
// Example
const users = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
````

## Component choice
- Prefer `src/components/ui/sheet.tsx` for desktop dialogs and `src/components/ui/dialog.tsx` for mobile dialogs.
- Use dialogs for inserting items, confirming choices, etc.
- Use `src/components/ui/card.tsx` for demonstrating item separation in pages, i.e., different item = different card.
- Use `src/components/ui/separator.tsx` for demonstrating separation inside items.
- Use `src/components/ui/tabs.tsx` for demonstrating alternation between different paths the user can take, for example, choosing to see weekly, monthly or yearly expenses, earnings and budgets.
- Use `src/components/ui/button.tsx` for buttons, if you need to use a Link, apply the buttonVariants() styling to it.
- Use `src/components/ui/form.tsx` when creating forms.
- Refer to `prompts/charts.md` for examples on how to create charts within this project.
- Refer to `prompts/data-table.md` on how to use the data table.

## Pages
- src/app/page.tsx: landing page:
  Sidebar (`/src/components/ui/sidebar.tsx`, on mobile use a `/src/components/ui/sheet.tsx`)
    - Top side:
      - Link to the home with the name of the project: "Valor Seguro"
      - Link to the about page
    - bottom side:
      - Account button:
        - When logged out, show login button, that redirects to /login.
        - When logged in, show the username and a logout button.
      - `src/components/mode-toggle.tsx`
  - Dark background with colorful details, use gradient.
  - Project tagline using `src/components/magicui/animated-gradient-text.tsx`: use large text.
  - Project description
  - `src/components/magicui/bento-grid.tsx` to show the benefits of using this project.

- src/app/login: login page:
  - Sidebar
  - Tabs:
    - Login to account:
      - E-mail field
      - Password field
      - Submit button. Sends login request to Supabase.
    - Register account:
      - Username field
      - E-mail field
      - Password field
      - Submit button. Sends sign up request to supabase and adds row to the `users` table.

- src/app/tags: tags page:
  - Sidebar
  - Page title
  - Add tag button, with a dialog that adds a row to tag
  - `src/components/ui/data-table.tsx` with sorting. add an edit (dialog with a form that edits the `tag` row) and remove button to each row

# The Magic Emporium — CLAUDE.md

### Components

- Use named exports with arrow functions:

```tsx
export const MyComponent = () => { ... }
```

- Use a separate interface for props:

```tsx
interface MyComponentProps { ... }

export const MyComponent = (props: MyComponentProps) => { ... }
```

- Create a Storybook story for every component. See `src/components/layout/Sidebar.stories.tsx` for an example.
- Do not use object destructuring

---

### Stories

- Use args/props pattern for stories, NOT duplicate render functions
- Ensure stories follow the project's existing conventions before creating new ones

Use render function to allow for arguments and context wraps, always include a story called Default. Example:
```tsx
import type {Meta, StoryObj} from '@storybook/react-vite';
import {Branding} from "@/components/layout/branding/Branding.tsx";

const meta = {
    title: 'Components/Layout/Branding',
    component: Branding,
    parameters: {
        layout: 'centered',
    },
    render: () => {
        return (
            <div className="dark p-6">
                <Branding/>
            </div>
        )
    },
} satisfies Meta<typeof Branding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

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
- Always use braces for if statements:

```ts
if (condition) {
    doSomething();
}
```

- Always provide explicit return types on functions:

```ts
const isMagicItem = (item: Item5e): boolean => {
    return item.flags[namespace.core.id]?.type === ItemType.MagicItem;
}
```

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

---

### Tests

- Use `bun:test` (`describe`, `it`, `expect`) with `@testing-library/react`.
- Structure every test with the AAA (Arrange, Act, Assert) pattern, marked with comments. Combine `ARRANGE & ACT` when rendering is the action.
- Write `it` descriptions as a behavior the component exhibits ("labels the modifier as LINEAR"), not as an implementation detail.

```tsx
import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { linearStealthFixture } from "../../../fixtures/modifiers/linear/linearStealth";
import { LinearModifierDisplay } from "./LinearModifierDisplay";

describe("LinearModifierDisplay", () => {
	it("labels the modifier as LINEAR", () => {
		// ARRANGE & ACT
		render(<LinearModifierDisplay modifier={linearStealthFixture} float={0} />);

		// ASSERT
		expect(screen.getByText("LINEAR")).toBeInTheDocument();
	});

	it("renders the flavor description", () => {
		// ARRANGE
		const modifier = linearStealthFixture;

		// ACT
		const view = render(<LinearModifierDisplay modifier={modifier} float={0} />);

		// ASSERT
		expect(view.container.textContent).toContain("Your Stealth skill increases");
	});
});
```

import type {Meta, StoryObj} from "@storybook/react-vite";
import {PlaceHolderInput} from "./PlaceHolderInput";

const meta = {
    title: "Components/Gacha/PlaceHolderInput",
    component: PlaceHolderInput,
    parameters: {
        layout: "centered",
    },
    render: () => {
        return <PlaceHolderInput/>;
    },
} satisfies Meta<typeof PlaceHolderInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

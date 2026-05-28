import type { FC, ReactNode } from "react";

declare module "react" {
	type ViewTransitionClassValue =
		| "auto"
		| "none"
		| string
		| {
				[type: string]: "auto" | "none" | string;
				default?: "auto" | "none" | string;
		  };

	interface ViewTransitionInstance {
		old: Element;
		new: Element;
		name: string;
		group: Element;
		imagePair: Element;
	}

	type ViewTransitionEventHandler = (
		instance: ViewTransitionInstance,
		types: string[],
	) => () => void;

	interface ViewTransitionProps {
		children?: ReactNode;
		name?: string;
		enter?: ViewTransitionClassValue;
		exit?: ViewTransitionClassValue;
		update?: ViewTransitionClassValue;
		share?: ViewTransitionClassValue;
		default?: ViewTransitionClassValue;
		onEnter?: ViewTransitionEventHandler;
		onExit?: ViewTransitionEventHandler;
		onUpdate?: ViewTransitionEventHandler;
		onShare?: ViewTransitionEventHandler;
	}

	const ViewTransition: FC<ViewTransitionProps>;

	function addTransitionType(type: string): void;
}

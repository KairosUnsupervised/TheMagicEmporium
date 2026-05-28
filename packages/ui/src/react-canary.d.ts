import type { FC, ReactNode } from "react";

declare module "react" {
	interface ViewTransitionProps {
		name?: string;
		children?: ReactNode;
	}
	const ViewTransition: FC<ViewTransitionProps>;
	function addTransitionType(type: string): void;
}

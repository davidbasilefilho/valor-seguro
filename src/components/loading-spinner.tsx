import type React from "react";
import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
	/**
	 * The size of the spinner in pixels
	 * @default 40
	 */
	size?: number;

	/**
	 * The color of the spinner
	 * @default "#0070f3" (primary blue)
	 */
	color?: string;

	/**
	 * The speed of the animation in seconds
	 * @default 1
	 */
	speed?: number;

	/**
	 * Optional additional class names
	 */
	className?: string;

	/**
	 * Text to be announced to screen readers
	 * @default "Loading"
	 */
	loadingText?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = 40,
	color = "#0070f3",
	speed = 1,
	className,
	loadingText = "Loading",
}) => {
	return (
		<div
			className={cn("flex items-center justify-center", className)}
			role="status"
		>
			<div
				className="relative"
				style={{
					width: `${size}px`,
					height: `${size}px`,
				}}
			>
				<div
					className="absolute inset-0 rounded-full border-t-2 border-solid opacity-25"
					style={{
						borderColor: color,
					}}
				></div>
				<div
					className="absolute inset-0 rounded-full border-t-2 border-l-2 border-solid animate-spin"
					style={{
						borderColor: color,
						animationDuration: `${speed}s`,
					}}
				></div>
			</div>
			<span className="sr-only">{loadingText}</span>
		</div>
	);
};

/**
 * A variant of the spinner with a text label
 */
export const LoadingSpinnerWithText: React.FC<
	LoadingSpinnerProps & { text?: string }
> = ({
	text = "Loading...",
	size = 40,
	color = "#0070f3",
	speed = 1,
	className,
	loadingText = "Loading",
}) => {
	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<LoadingSpinner
				size={size}
				color={color}
				speed={speed}
				loadingText={loadingText}
			/>
			<p className="text-sm font-medium" style={{ color }}>
				{text}
			</p>
		</div>
	);
};

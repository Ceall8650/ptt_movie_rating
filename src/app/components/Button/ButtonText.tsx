import React from 'react';

type OwnProps = {
	label: string,
	className?: string,
	isLoading?: boolean,
	type?: "button" | "submit",
}
type Props = OwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>

function ButtonText({
	label,
	type = "button",
	className = "",
	isLoading = false,
	...props
}: Props) {
	return (
		<button
			type={type}
			className={`${className} btn`}
			disabled={isLoading}
			{...props}
		>
			{label}
		</button>
	);
}

export default ButtonText;

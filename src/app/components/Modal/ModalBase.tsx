type Props = {
  id: string,
  width?: number,
  height?: number,
  children: React.ReactNode
  onClose: Function,
}

function ModalBase({
  id,
  children,
  width = 500,
  height = 600,
  onClose,
}: Props) {

  return (
		<div className="w-full h-full fixed z-modal top-0 left-0 bg-black/50 flex items-center justify-center">
			<div
				className="bg-white dark:bg-dark-mode-modal rounded-md relative"
				style={{ width: `${width}px`, height: `${height}px` }}
			>
				<i
					className="inline-block icon-close text-2xl absolute top-0 right-0 cursor-pointer"
					onClick={() => onClose()}
				/>
				{children}
			</div>
		</div>
	);
}

export default ModalBase

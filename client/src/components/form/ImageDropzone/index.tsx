import {
	useCallback,
	useEffect,
	useState,
	type FC,
} from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type ImageDropzoneProps = {
	onImageUpload?: (file: File) => void
	initialPreviewUrl?: string | null
}

export const ImageDropzone: FC<ImageDropzoneProps> = ({
	onImageUpload,
	initialPreviewUrl = null,
}) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [isDragging, setIsDragging] = useState(false)

	useEffect(() => {
		setPreviewUrl(initialPreviewUrl)
	}, [initialPreviewUrl])

	const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsDragging(false)

		const file = event.dataTransfer.files[0]
		if (file && file.type.startsWith('image/')) {
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			onImageUpload?.(file)
		}
	}, [onImageUpload])

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file && file.type.startsWith('image/')) {
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			onImageUpload?.(file)
		}
	}

	return (
		<div
			className={clsx(styles.dropzone, isDragging && styles.dragging)}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onClick={() => document.getElementById('fileInput')?.click()}
		>
			{previewUrl ? (
				<img src={previewUrl} alt="Preview" className={styles.preview} />
			) : (
				<p>Перетащите фото питомца сюда или кликните для выбора</p>
			)}
			<input
				id="fileInput"
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
		</div>
	)
}

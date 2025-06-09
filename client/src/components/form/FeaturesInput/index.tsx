import React, { useState } from 'react'
import styles from './styles.module.css'

interface FeaturesInputProps {
	features: string[]
	setFeatures: (features: string[]) => void
	label: string
	placeholder?: string
}

export const FeaturesInput: React.FC<FeaturesInputProps> = ({
	features,
	setFeatures,
	label,
	placeholder,
}) => {
	const [input, setInput] = useState('')

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			const trimmed = input.trim()
			if (trimmed && !features.includes(trimmed)) {
				setFeatures([trimmed, ...features])
			}
			setInput('')
		}
	}

	const removeFeature = (featureToRemove: string) => {
		setFeatures(features.filter(f => f !== featureToRemove))
	}

	return (
		<div className={styles.wrapper}>
			<span className={styles.label}>
				{label}
			</span>
			{features.length !== 0 &&
				<div className={styles.features}>
					{features.map((feature) => (
						<div className={styles.feature} key={feature}>
							<span
								className={styles.text}
								onClick={() => removeFeature(feature)}
							>
								{feature}
							</span>
						</div>
					))}
				</div>
			}
			<textarea
				className={styles.textarea}
				value={input}
				onChange={e => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder || 'Введите особенность и нажмите Enter'}
			/>
		</div>
	)
}

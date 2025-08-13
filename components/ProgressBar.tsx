type Props = { value: number }

export default function ProgressBar({ value }: Props) {
  return (
    <div className="progress-container" aria-label="progress">
      <div className="progress-bar" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

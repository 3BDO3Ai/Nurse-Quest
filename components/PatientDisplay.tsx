import Image from 'next/image'
import { useMemo } from 'react'

type Props = {
  avatar: string
  visualSymptoms?: Record<string, string>
  currentVisualKey?: string | null
}

export default function PatientDisplay({ avatar, visualSymptoms, currentVisualKey }: Props) {
  const activeVisual = useMemo(() => {
    if (!visualSymptoms || !currentVisualKey) return avatar
    return visualSymptoms[currentVisualKey] || avatar
  }, [avatar, visualSymptoms, currentVisualKey])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-64 h-64 relative">
        <Image src={activeVisual} alt="Patient avatar" fill className="object-contain" priority />
      </div>
      <p className="text-sm text-slate-600">Patient</p>
    </div>
  )
}

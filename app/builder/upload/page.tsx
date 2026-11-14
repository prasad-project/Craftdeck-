import type { Metadata } from 'next'
import ResumeUpload from './resume-upload'
import './upload.css'

export const metadata: Metadata = {
  title: 'Upload your resume | DevPortfolio',
  description: 'Choose a resume and continue to your developer portfolio builder.',
}

export default function ResumeUploadPage() {
  return <ResumeUpload />
}

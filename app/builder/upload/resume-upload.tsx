'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, FileText, LockKeyhole, Upload } from 'lucide-react'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_EXTENSIONS = /\.(pdf|docx)$/i
const ACCEPTED_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ResumeUpload() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const selectFile = (file?: File) => {
    if (!file) return

    const hasAcceptedType = ACCEPTED_TYPES.has(file.type) || ACCEPTED_EXTENSIONS.test(file.name)
    if (!hasAcceptedType) {
      setResume(null)
      setError('Choose a PDF or DOCX file to continue.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setResume(null)
      setError('Your resume must be 10 MB or smaller.')
      return
    }

    setError('')
    setResume(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    selectFile(event.dataTransfer.files[0])
  }

  return (
    <main className="resume-upload-page">
      <div className="resume-upload-shell">
        <header className="resume-upload-header">
          <h1>Let&apos;s Build Your Developer Portfolio</h1>
          <p>Select a PDF or DOCX resume to continue. This preview checks the file locally; it does not upload or extract it.</p>
        </header>

        <section className="resume-card" aria-labelledby="resume-card-title">
          <div className="resume-card-heading">
            <h2 id="resume-card-title">Upload Your Resume</h2>
            <p>Choose your resume to continue to the portfolio builder.</p>
          </div>

          <div
            className={`resume-dropzone${isDragging ? ' is-dragging' : ''}${error ? ' has-error' : ''}`}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDragging(false)
            }}
            onDrop={handleDrop}
            aria-describedby="resume-file-rules resume-upload-feedback"
          >
            <span className="resume-upload-icon" aria-hidden="true"><Upload size={21} strokeWidth={2}/></span>
            <p className="resume-drop-title">Drag your resume here or browse files</p>
            <input
              ref={inputRef}
              className="resume-file-input"
              id="resume-file"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              aria-label="Choose a PDF or DOCX resume"
              onChange={(event) => {
                selectFile(event.currentTarget.files?.[0])
                event.currentTarget.value = ''
              }}
            />
            <button className="resume-select-button" type="button" onClick={() => inputRef.current?.click()}>
              Upload Resume
            </button>
            <div className="resume-file-rules" id="resume-file-rules">
              <span>PDF</span>
              <span>DOCX</span>
              <small>Maximum file size: 10 MB</small>
            </div>
          </div>

          {resume && (
            <div className="resume-selected-file" role="status">
              <FileText size={17} aria-hidden="true" />
              <span className="resume-selected-name">{resume.name}</span>
              <span className="resume-selected-size">{formatFileSize(resume.size)}</span>
            </div>
          )}

          <p className={`resume-upload-feedback${error ? ' is-error' : ''}`} id="resume-upload-feedback" role="status" aria-live="polite">
            {error || 'Your file is checked locally and is not uploaded or publicly displayed.'}
          </p>

          <div className="resume-continue-area">
            <button className="resume-continue-button" type="button" disabled={!resume} onClick={() => router.push('/builder')}>
              Continue <ArrowRight size={15} aria-hidden="true"/>
            </button>
            <small>{resume ? 'Continue to your portfolio builder' : 'Upload a valid resume to continue'}</small>
          </div>
        </section>

        <section className="resume-manual-card" aria-label="Create a portfolio without a resume">
          <div>
            <h2>Don&apos;t have a resume?</h2>
            <p>Enter your details step by step in the portfolio builder.</p>
          </div>
          <Link className="resume-manual-button" href="/builder">Create Portfolio Manually</Link>
        </section>

        <p className="resume-privacy-note"><LockKeyhole size={13} aria-hidden="true"/> No file is sent to a server or saved in this preview.</p>
      </div>
    </main>
  )
}

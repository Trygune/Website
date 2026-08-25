import ExperienceFormFields from './ExperienceFormFields'

type ExperienceFormProps = {
  initialData?: {
    role?: string
    company?: string
    type?: string
    location?: string
    startDate?: string
    endDate?: string
    current?: boolean
    description?: string
    responsibilities?: string[]
    technologies?: string[]
  }
}

const ExperienceForm = ({ initialData }: ExperienceFormProps) => {
  return <ExperienceFormFields initialData={initialData} />
}

export default ExperienceForm

import { FormEvent } from 'react'

type dataSelect = { value: string; label: string }

export interface CampoVar {
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
  label: string
  id: string
  name: string
  placeholder?: string
  type: 'text' | 'password' | 'number' | 'date'
  data?: Array<dataSelect>
  disabled?: boolean
}

export function CampoInput(props: CampoVar) {
  return (
    <div className="form-group w-75">
      <label htmlFor={props.id} className="fs-4 fw-bold">
        {props.label}
      </label>

      <input
        type={props.type}
        className="form-control"
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  )
}

import { FormEvent } from 'react'

export interface CampoVar {
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
  label: string
  id: string
  name: string
  placeholder?: string
  type: 'text' | 'password'
}

export function Campo(props: CampoVar) {
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
      />
    </div>
  )
}

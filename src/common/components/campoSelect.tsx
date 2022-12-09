import { FormEvent } from 'react'

type dataSelect = { value: string; label: string }

export interface CampoVar {
  value: string
  defaultValue?: string
  onChange: (e: FormEvent<HTMLSelectElement>) => void
  label: string
  id: string
  name: string
  data: Array<dataSelect>
  disabled?: boolean
}

export function CampoSelect(props: CampoVar) {
  let selectParams = null
  const { defaultValue, label, ...res } = props

  if (!defaultValue) selectParams = res
  else selectParams = { ...res, defaultValue }
  return (
    <div className="form-group w-75">
      <label htmlFor={selectParams.id} className="fs-4 fw-bold">
        {label}
      </label>
      <select className="form-select" {...selectParams}>
        <option value="Ninguno">
          Seleccionar
        </option>
        {props.data.map((e, i) => {
          return (
            <option key={`7894561${i}`} value={e.value}>
              {e.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

import { OfertaTypeData } from 'src/modules/mongodb/schema/ofertaModel'
import { useState, FormEvent } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { isOfertaData } from 'src/common/utils/validations/oferta'
import { useLoginContext } from 'src/hook/useLogin'
import { isEmpresaData } from 'src/common/utils/validations/empresa'
export interface AddEditFormTypes {
  item: OfertaTypeData
  toggle: () => void
  updateState: (item: OfertaTypeData) => void
  addItemToState: (item: OfertaTypeData) => void
}

const INITIAL_OFERTA: OfertaTypeData = {
  conocimientos: '',
  estudios_minimos: '',
  idioma: '',
  lugar: '',
  puesto: '',
  area: '',
  jornada_laboral: '',
  fecha_publicacion: '',
  titulo: '',
  postulantes: [],
}

export default function AddEditForm({
  item,
  toggle,
  updateState,
  addItemToState,
}: AddEditFormTypes) {
  const userData = useLoginContext()
  let empresa = isEmpresaData(userData.user) ? userData.user : null
  const [data, setData] = useState<OfertaTypeData>(item || INITIAL_OFERTA)

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value })
  }

  const submitFormAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch('/api/oferta', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oferta: {
          ...data,
          empresa: empresa?._id,
          fecha_publicacion: new Date().toDateString(),
        },
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (isOfertaData(item)) {
          addItemToState(item)
          toggle()
        } else {
          console.log('failure')
        }
      })
      .catch((err) => console.log(err))
  }

  const submitFormEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`/api/oferta/${item._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (isOfertaData(item)) {
          updateState({ ...item, empresa: item.empresa?._id })
          toggle()
        } else {
          console.log('failure')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Form onSubmit={item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="titulo">Titulo</Label>
        <Input
          type="text"
          name="titulo"
          id="titulo"
          onChange={onChange}
          value={data?.titulo === null ? '' : data?.titulo}
        />
      </FormGroup>
      <FormGroup>
        <Label for="conocimientos">Conocimientos:</Label>
        <Input
          type="text"
          name="conocimientos"
          id="conocimientos"
          onChange={onChange}
          value={data?.conocimientos === null ? '' : data?.conocimientos}
        />
      </FormGroup>
      <FormGroup>
        <Label for="estudios_minimos">Estudios minimos:</Label>
        <Input
          type="text"
          name="estudios_minimos"
          id="estudios_minimos"
          onChange={onChange}
          value={data?.estudios_minimos === null ? '' : data?.estudios_minimos}
        />
      </FormGroup>
      <FormGroup>
        <Label for="idioma">Idioma:</Label>
        <Input
          type="text"
          name="idioma"
          id="idioma"
          onChange={onChange}
          value={data?.idioma === null ? '' : data?.idioma}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lugar">Lugar:</Label>
        <Input
          type="text"
          name="lugar"
          id="lugar"
          onChange={onChange}
          value={data?.lugar === null ? '' : data?.lugar}
        />
      </FormGroup>
      <FormGroup>
        <Label for="puesto">Puesto:</Label>
        <Input
          type="text"
          name="puesto"
          id="puesto"
          onChange={onChange}
          value={data?.puesto === null ? '' : data?.puesto}
        />
      </FormGroup>
      <FormGroup>
        <Label for="area">Area:</Label>
        <Input
          type="text"
          name="area"
          id="area"
          onChange={onChange}
          value={data?.area === null ? '' : data?.area}
        />
      </FormGroup>
      <FormGroup>
        <Label for="jornada">Jornada:</Label>
        <Input
          type="text"
          name="jornada_laboral"
          id="jornada_laboral"
          onChange={onChange}
          value={data?.jornada_laboral === null ? '' : data?.jornada_laboral}
        />
      </FormGroup>
      <Button type="submit">Confirmar</Button>
    </Form>
  )
}

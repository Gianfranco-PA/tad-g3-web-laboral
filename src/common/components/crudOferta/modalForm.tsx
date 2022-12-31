import { OfertaTypeData } from 'src/modules/mongodb/schema/ofertaModel'
import { useState } from 'react'
import { Modal, Button, ModalBody, ModalHeader } from 'reactstrap'
import AddEditForm from './addEditForm'
export interface ModalFormTypes {
  item?: OfertaTypeData
  buttonLabel?: string
  updateState?: (item: OfertaTypeData) => void
  addItemToState?: (item: OfertaTypeData) => void
}

export default function ModalForm({
  item,
  buttonLabel,
  updateState,
  addItemToState,
}: ModalFormTypes) {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  )

  const label = buttonLabel
  let button = null
  let title = ''
  if (label === 'Editar') {
    button = (
      <Button
        color="warning"
        onClick={toggle}
        style={{
          width: '100%',
        }}
      >
        {label}
      </Button>
    )
    title = 'Modificar Oferta'
  } else {
    button = (
      <Button
        color="success"
        onClick={toggle}
        style={{ float: 'left', marginRight: '10px' }}
      >
        {label}
      </Button>
    )
    title = 'Agregar nueva Oferta'
  }
  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={addItemToState!}
            updateState={updateState!}
            toggle={toggle}
            item={item!}
          />
        </ModalBody>
      </Modal>
    </div>
  )
}

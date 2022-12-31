import { OfertaTypeData } from 'src/modules/mongodb/schema/ofertaModel'
import { useState } from 'react'
import { Modal, Button, ModalBody, ModalHeader, Table } from 'reactstrap'
export interface ModalFormTypes {
  item: OfertaTypeData
}

export default function ModalList({ item }: ModalFormTypes) {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  )
  return (
    <div>
      <Button
        color="info"
        onClick={toggle}
        style={{ float: 'left', marginRight: '10px' }}
      >
        Ver
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle} close={closeBtn}>
          Lista de postulantes
        </ModalHeader>
        <ModalBody>
          {item.postulantes.length !== 0 ? (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Celular</th>
                </tr>
              </thead>
              <tbody>
                {item?.postulantes?.map((elem, i) => {
                  return (
                    <tr key={`456123${i}`}>
                      <th scope="row">{i + 1}</th>
                      <td>{`${elem.nombre} ${elem.apellido}`}</td>
                      <td>{elem.credenciales?.correo}</td>
                      <td>{elem.celular}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          ) : (
            <div>No hay postulantes</div>
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}

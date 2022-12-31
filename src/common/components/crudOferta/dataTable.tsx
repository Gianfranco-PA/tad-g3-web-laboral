import { OfertaTypeData } from 'src/modules/mongodb/schema/ofertaModel'
import { Button, Table } from 'reactstrap'
import ModalForm from './modalForm'
import { useLoginContext } from 'src/hook/useLogin'
import { isEmpresaData } from 'src/common/utils/validations/empresa'
import ModalList from './modelList'
export interface DataTableTypes {
  items: Array<OfertaTypeData>
  deleteItemFromState: (id: string) => void
  updateState: (item: OfertaTypeData) => void
}

export default function DataTable({
  items,
  deleteItemFromState,
  updateState,
}: DataTableTypes) {
  const userData = useLoginContext()
  let user = isEmpresaData(userData.user) ? userData.user : null
  const deleteItem = (id: string) => {
    let confirmDelete = window.confirm(
      'Estas seguro de eliminar este elemento?',
    )
    if (confirmDelete) {
      fetch(`/api/oferta/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => deleteItemFromState(id))
        .catch((err) => console.log(err))
    }
  }
  const filas = items
    .filter((e) => e.empresa?._id == user?._id)
    .map((item) => {
      return (
        <tr key={String(item._id)}>
          <th scope="row">{String(item._id)}</th>
          <td>{item.titulo}</td>
          <td>{item.fecha_publicacion}</td>
          <td>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ModalForm
                buttonLabel="Editar"
                item={item}
                updateState={updateState}
              />
              <Button
                color="danger"
                style={{ width: '100%', marginTop: '5px' }}
                onClick={() => deleteItem(String(item._id))}
              >
                Borrar
              </Button>
            </div>
          </td>
          <td>
            <ModalList item={item} />
          </td>
        </tr>
      )
    })
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titulo</th>
          <th>Fecha publicación</th>
          <th>Acciones</th>
          <th>Postulantes</th>
        </tr>
      </thead>
      <tbody>{filas}</tbody>
    </Table>
  )
}

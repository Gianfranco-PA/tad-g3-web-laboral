import { useState, useEffect } from 'react'
import { Container, Col, Row } from 'reactstrap'
import { OfertaTypeData } from 'src/modules/mongodb/schema/ofertaModel'
import DataTable from 'src/common/components/crudOferta/dataTable'
import ModalForm from 'src/common/components/crudOferta/modalForm'

export default function Crud({}) {
  const [items, setItems] = useState<Array<OfertaTypeData>>([])

  const addItemToState = (item: OfertaTypeData) => {
    setItems((prevState) => [...prevState, item])
  }
  const updateState = (item: OfertaTypeData) => {
    const itemIndex = items.findIndex((data) => data._id === item._id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...items.slice(itemIndex + 1),
    ]
    setItems(newArray)
  }

  const deleteItemFromState = (id: string) => {
    const updatedItems = items.filter((item) => String(item._id) !== id)
    setItems(updatedItems)
  }

  useEffect(() => {
    const extraerDatos = async () => {
      await fetch('/api/oferta')
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((e) => console.log(e))
    }
    extraerDatos()
  }, [])

  return (
    <Container style={{ marginTop: '10px' }}>
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>CRUD Ofertas</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            items={items}
            updateState={updateState}
            deleteItemFromState={deleteItemFromState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalForm buttonLabel="Agregar" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )
}

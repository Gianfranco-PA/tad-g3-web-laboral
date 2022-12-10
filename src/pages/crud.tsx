import React, { useState } from 'react'
// import { Container, Modal } from 'reactstrap'
// import Button from 'reactstrap/types/lib/Button'
// import Col from 'reactstrap/types/lib/Col'
// import Form from 'reactstrap/types/lib/Form'
// import FormGroup from 'reactstrap/types/lib/FormGroup'
// import Input from 'reactstrap/types/lib/Input'
// import Label from 'reactstrap/types/lib/Label'
// import ModalBody from 'reactstrap/types/lib/ModalBody'
// import ModalHeader from 'reactstrap/types/lib/ModalHeader'
// import Row from 'reactstrap/types/lib/Row'
// import Table from 'reactstrap/types/lib/Table'
// import { OfertaType } from 'src/modules/mongodb/schema/ofertaModel'
// import { FormEvent } from 'react'

// export default function Crud({}) {
//   const [items, setItems] = useState<Array<OfertaType>>([])

//   const addItemToState = (item: OfertaType) => {
//     setItems((prevState) => [...prevState, item])
//   }
//   const updateState = (item: OfertaType) => {
//     const itemIndex = items.findIndex((data) => data._id === item._id)
//     const newArray = [
//       // destructure all items from beginning to the indexed item
//       ...items.slice(0, itemIndex),
//       // add the updated item to the array
//       item,
//       // add the rest of the items to the array from the index after the replaced item
//       ...items.slice(itemIndex + 1),
//     ]
//     setItems(newArray)
//   }

//   const deleteItemFromState = (id: string) => {
//     const updatedItems = items.filter((item) => String(item._id) !== id)
//     setItems(updatedItems)
//   }
//   return (
//     <Container className="App">
//       <Row>
//         <Col>
//           <h1 style={{ margin: '20px 0' }}>CRUD Database</h1>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <DataTable
//             items={items}
//             updateState={updateState}
//             deleteItemFromState={deleteItemFromState}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <ModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// interface DataTableTypes {
//   items: Array<OfertaType>
//   deleteItemFromState: (id: string) => void
//   updateState: (item: OfertaType) => void
// }

// function DataTable({
//   items,
//   deleteItemFromState,
//   updateState,
// }: DataTableTypes) {
//   const deleteItem = (id: string) => {
//     let confirmDelete = window.confirm('Delete item forever?')
//     if (confirmDelete) {
//       fetch('aca falta', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id,
//         }),
//       })
//         .then((response) => response.json())
//         .then((item) => {
//           deleteItemFromState(id)
//         })
//         .catch((err) => console.log(err))
//     }
//   }

//   const filas = items.map((item) => {
//     return (
//       <tr key={String(item._id)}>
//         <th scope="row">{String(item._id)}</th>
//         <td>{item.titulo}</td>
//         <td>{item.fecha_publicacion}</td>
//         <td>
//           <div style={{ width: '110px' }}>
//             <ModalForm
//               buttonLabel="Edit"
//               item={item}
//               updateState={updateState}
//             />{' '}
//             <Button color="danger" onClick={() => deleteItem(String(item._id))}>
//               Del
//             </Button>
//           </div>
//         </td>
//       </tr>
//     )
//   })
//   return (
//     <Table responsive hover>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>First</th>
//           <th>Last</th>
//           <th>Email</th>
//           <th>Phone</th>
//           <th>Location</th>
//           <th>Hobby</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>{filas}</tbody>
//     </Table>
//   )
// }

// interface ModalFormTypes {
//   item: OfertaType
//   buttonLabel: string
//   updateState: (item: OfertaType) => void
//   addItemToState: (item: OfertaType) => void
// }

// function ModalForm({
//   item,
//   buttonLabel,
//   updateState,
//   addItemToState,
// }: ModalFormTypes) {
//   const [modal, setModal] = useState(false)
//   const toggle = () => setModal(!modal)
//   const closeBtn = (
//     <button className="close" onClick={toggle}>
//       &times;
//     </button>
//   )

//   const label = buttonLabel
//   let button = null
//   let title = ''
//   if (label === 'Edit') {
//     button = (
//       <Button
//         color="warning"
//         onClick={toggle}
//         style={{ float: 'left', marginRight: '10px' }}
//       >
//         {label}
//       </Button>
//     )
//     title = 'Edit Item'
//   } else {
//     button = (
//       <Button
//         color="success"
//         onClick={toggle}
//         style={{ float: 'left', marginRight: '10px' }}
//       >
//         {label}
//       </Button>
//     )
//     title = 'Add New Item'
//   }
//   return (
//     <div>
//       {button}
//       <Modal isOpen={modal} toggle={toggle}>
//         <ModalHeader toggle={toggle} close={closeBtn}>
//           {title}
//         </ModalHeader>
//         <ModalBody>
//           <AddEditForm
//             addItemToState={addItemToState}
//             updateState={updateState}
//             toggle={toggle}
//             item={item}
//           />
//         </ModalBody>
//       </Modal>
//     </div>
//   )
// }

// interface AddEditFormTypes {
//   item: OfertaType
//   toggle: () => void
//   updateState: (item: OfertaType) => void
//   addItemToState: (item: OfertaType) => void
// }

// const INITIAL_OFERTA: OfertaType = {
//   descripcion: '',
//   fecha_publicacion: '',
//   titulo: '',
// }

// function AddEditForm({
//   item,
//   toggle,
//   updateState,
//   addItemToState,
// }: AddEditFormTypes) {
//   const [data, setData] = useState<OfertaType>(INITIAL_OFERTA)

//   const onChange = (e: FormEvent<HTMLInputElement>) => {
//     setData({ [e.currentTarget.name]: e.currentTarget.value })
//   }

//   const submitFormAdd = e => {
//     e.preventDefault()
//     fetch('http://localhost:3000/crud', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         first: this.state.first,
//         last: this.state.last,
//         email: this.state.email,
//         phone: this.state.phone,
//         location: this.state.location,
//         hobby: this.state.hobby
//       })
//     })
//       .then(response => response.json())
//       .then(item => {
//         if(Array.isArray(item)) {
//           this.props.addItemToState(item[0])
//           this.props.toggle()
//         } else {
//           console.log('failure')
//         }
//       })
//       .catch(err => console.log(err))
//   }
//   return (
//     <Form onSubmit={item ? this.submitFormEdit : this.submitFormAdd}>
//       <FormGroup>
//         <Label for="first">First Name</Label>
//         <Input
//           type="text"
//           name="first"
//           id="first"
//           onChange={this.onChange}
//           value={this.state.first === null ? '' : this.state.first}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="last">Last Name</Label>
//         <Input
//           type="text"
//           name="last"
//           id="last"
//           onChange={this.onChange}
//           value={this.state.last === null ? '' : this.state.last}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="email">Email</Label>
//         <Input
//           type="email"
//           name="email"
//           id="email"
//           onChange={this.onChange}
//           value={this.state.email === null ? '' : this.state.email}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="phone">Phone</Label>
//         <Input
//           type="text"
//           name="phone"
//           id="phone"
//           onChange={this.onChange}
//           value={this.state.phone === null ? '' : this.state.phone}
//           placeholder="ex. 555-555-5555"
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="location">Location</Label>
//         <Input
//           type="text"
//           name="location"
//           id="location"
//           onChange={this.onChange}
//           value={this.state.location === null ? '' : this.state.location}
//           placeholder="City, State"
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="hobby">Hobby</Label>
//         <Input
//           type="text"
//           name="hobby"
//           id="hobby"
//           onChange={this.onChange}
//           value={this.state.hobby}
//         />
//       </FormGroup>
//       <Button>Submit</Button>
//     </Form>
//   )
// }

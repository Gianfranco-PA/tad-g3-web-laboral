import React, { useEffect, useState } from 'react'

type Props = {}

function ListaOferta({}: Props) {
  const [ofertas, setOfertas] = useState(null)
  useEffect(() => {
    const data = async () => {
      const result = await fetch('api/oferta').then((res) => res.json())
      console.log(result)
      setOfertas(result)
    }
    data()
  }, [])
  return <div>lista-oferta</div>
}

export default ListaOferta

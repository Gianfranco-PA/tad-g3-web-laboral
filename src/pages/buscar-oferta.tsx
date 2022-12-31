import styles from 'src/common/styles/buscar.module.css'
import React, { useEffect, useState } from 'react'
import { OfertaTypePrimitive } from 'src/modules/mongodb/schema/ofertaModel'
import { Footer } from 'src/common/components/footer/footer'
import Link from 'next/link'

export default function Buscar() {
  const [ofertas, setOfertas] = useState<Array<OfertaTypePrimitive>>([])
  useEffect(() => {
    const data = async () => {
      const result = await fetch('api/oferta').then((res) => res.json())
      setOfertas(result)
    }
    data()
  }, [])

  return (
    <div className={styles.cuerpo}>
      <h1 className="text-center">Buscar Ofertas</h1>
      <div className="container-fluid py-5">
        <form className="row g-3 justify-content-center">
          {ofertas.map((ofert, key) => (
            <div key={`451237${key}`} className="col-sm-5 ">
              <div className="card ">
                <div className="card-body">
                  <h5 className="card-title">{ofert.titulo}</h5>
                  <p className="card-text">{ofert.fecha_publicacion}</p>
                  <Link href={`oferta/${String(ofert._id)}`}>
                    <a className="btn btn-primary">Abrir detalle</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
      <Footer />
    </div>
  )
}

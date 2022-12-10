import PrincipalLayout from 'src/common/components/layouts/principal'
import styles from 'src/common/styles/buscar.module.css'
import { useFetch } from '../hook/useFetch'
import React, { useEffect, useState } from 'react'
import { OfertaType } from 'src/modules/mongodb/schema/ofertaModel'

type Props = {}

export default function Buscar() {
  /*  const{data} = useFetch('http://localhost:3000/api/oferta')
  console.log(data[0])
  const{titulo, descripcion} = data[0]
 */
  const [ofertas, setOfertas] = useState<Array<OfertaType>>([])
  useEffect(() => {
    const data = async () => {
      const result = await fetch('api/oferta').then((res) => res.json())
      console.log(result)
      setOfertas(result)
    }
    data()
  }, [])

  return (
    <div className={styles.cuerpo}>
      <h1 className="text-center">Buscar Ofertas</h1>
      <section className={styles.layout}>
        <div className={styles.leftSide}>Lateral Izquierdo</div>
        <div className={styles.body}>
          <section className={styles.cuerpo_medio}>
            <div>
              {ofertas.map((ofert, key) => (
                <div key={key}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{ofert.titulo}</h5>
                      <p className="card-text">{ofert.descripcion}</p>
                      <a href="#" className="btn btn-primary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className={styles.rightSide}>Lateral Derecho</div>
        <div className={styles.footer}>Footer</div>
      </section>
    </div>
  )
}

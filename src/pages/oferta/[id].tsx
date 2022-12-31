import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { OfertaTypeData } from 'src/modules/mongodb/schema/ofertaModel'
import styles from 'src/common/styles/ofertas.module.css'
import Navbar from 'src/common/components/navbar/navbar'
import Head from 'next/head'
import { useLoginContext } from 'src/hook/useLogin'
import { isPersonaData } from 'src/common/utils/validations/persona'

export default function LoginPage({}) {
  const userData = useLoginContext()
  let user = isPersonaData(userData.user) ? userData.user : null
  const router = useRouter()
  const { id } = router.query
  // console.log(router.asPath)
  const [oferta, setOferta] = useState<OfertaTypeData | null>(null)
  // console.log(oferta?.postulantes)
  const [postulo, setPostulo] = useState(false)

  useEffect(() => {
    const get = async () => {
      if (!id) return
      fetch(`/api/oferta/${id}`)
        .then((res) => res.json())
        .then((data: OfertaTypeData) => {
          setOferta(data)
          const isPostulo = data.postulantes.some(
            (elem) => String(elem._id) == String(user?._id),
          )
          setPostulo(isPostulo)
        })
    }
    get()
  }, [id, user?._id])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(oferta)
    let enviar = {
      ...oferta,
      postulantes: [...oferta?.postulantes!, String(user?._id)],
    }
    if (postulo) {
      enviar = {
        ...oferta,
        postulantes: [
          ...oferta?.postulantes.filter(
            (e) => String(e._id) != String(user?._id),
          )!,
        ],
      }
    }
    await fetch(`/api/oferta/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(enviar),
    })
      .then((res) => res.json())
      .then((data) => router.push('/buscar-oferta'))
  }
  return (
    <>
      <Navbar />
      <Head>
        <title>{oferta?.titulo}</title>
      </Head>
      <div className="container-fluid">
        <div className="container-fluid py-5 ">
          <div className={styles.main_block}>
            <form className={styles.form} onSubmit={onSubmit}>
              <h1 className={styles.h1}>Detalles de la Oferta</h1>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                  <h3 className={styles.h3}>Detalles</h3>
                </legend>

                <div className={styles.account_details}>
                  <div className={styles.div}>
                    <label className={styles.label}>Empresa:</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="Empresa"
                      value={oferta?.empresa?.nombre_empresa}
                      disabled
                    ></input>{' '}
                  </div>
                  <div className={styles.div}>
                    <label className={styles.label}>Conocimientos:</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="Conocimientos"
                      value={oferta?.conocimientos}
                      disabled
                    ></input>{' '}
                  </div>
                  <div className={styles.div}>
                    <label className={styles.label}>Idioma:</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="Idioma"
                      value={oferta?.idioma}
                      disabled
                    ></input>
                  </div>
                  <div className={styles.div}>
                    <label className={styles.label}>Estudios minimos:</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="Estudios"
                      value={oferta?.estudios_minimos}
                      disabled
                    ></input>{' '}
                  </div>
                </div>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    <h3 className={styles.h3}>Resumen de Oferta</h3>
                  </legend>

                  <div className={styles.account_details}>
                    <div className={styles.div}>
                      <label className={styles.label}>
                        Nombre de la Empresa:
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        name="Nombre_Empresa"
                        value={oferta?.empresa?.nombre_empresa}
                        disabled
                      ></input>{' '}
                    </div>
                    <div className={styles.div}>
                      <label className={styles.label}>Lugar:</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="Lugar"
                        value={oferta?.lugar}
                        disabled
                      ></input>{' '}
                    </div>
                    <div className={styles.div}>
                      <label className={styles.label}>Puestos:</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="Puestos"
                        value={oferta?.puesto}
                        disabled
                      ></input>{' '}
                    </div>
                    <div className={styles.div}>
                      <label className={styles.label}>Jornada Laboral:</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="Jornada"
                        value={oferta?.jornada_laboral}
                        disabled
                      ></input>{' '}
                    </div>
                    <div className={styles.div}>
                      <label className={styles.label}>Area:</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="Area"
                        value={oferta?.area}
                        disabled
                      ></input>{' '}
                    </div>
                  </div>
                </fieldset>

                {user ? !postulo ? <Postulacion /> : <YaPostulo /> : null}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

function Postulacion() {
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <h3 className={styles.h3}>Terminos y condiciones</h3>
        </legend>

        <div className={styles.terms_mailing}>
          <div className={styles.checkbox}>
            <input type="checkbox" name="checkbox"></input>{' '}
            <span>
              Yo acepto la{' '}
              <a href="https://www.privacy-policy-template.com/privacy-policy-generator">
                Politica de privacidad.
              </a>
            </span>
          </div>
        </div>
      </fieldset>
      <button className={styles.button} name="login" id="login" type="submit">
        Registrar Postulacion
      </button>
    </>
  )
}

function YaPostulo() {
  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <h3 className={styles.h3} style={{ color: 'red' }}>
            Ya esta postulando
          </h3>
        </legend>
      </fieldset>
      <button
        className={styles.button}
        style={{ backgroundColor: 'red' }}
        name="login"
        id="login"
        type="submit"
      >
        Eliminar postulación
      </button>
    </>
  )
}

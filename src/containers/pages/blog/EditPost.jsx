import BlogList from "components/blog/BlogList"
import Layout from "hocs/layout/Layout"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { connect } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { get_author_blog_list, get_author_blog_list_page, get_blog } from "redux/actions/blog/blog"
import { get_categories } from "redux/actions/categories/categories"
import { PaperClipIcon } from '@heroicons/react/20/solid'
import axios from "axios"
import DOMPurify from 'dompurify'

function EditPost({
    post,
    get_blog,
    isAuthenticated
}){

    const params = useParams()
    const slug = params.slug

    useEffect(()=> {
        window.scrollTo(0,0)
        get_blog(slug)
    },[slug])

    const [updateTitle, setUpdateTitle] = useState(false)
    const [updateSlug, setUpdateSlug] = useState(false)
    const [updateDescription, setUpdateDescription] = useState(false)
    const [updateContent, setUpdateContent] = useState(false)
    const [content, setContent] = useState('')

    const [formData, setFormData] = useState({
        title:'',
        new_slug:'',
        description:'',
        category:'',
        time_read:'',
    })

    const {
        title,
        new_slug,
        description,
        category,
        time_read,
    } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const [loading, setLoading] = useState(false)
    const [showFullContent, setShowFullContent] = useState(false)
    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault()        
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('title', title)
        formData.append('slug', slug)
        formData.append('new_slug', new_slug)
        formData.append('description', description)
        if (content){
            formData.append('content', content)
        }
        
        const fetchData = async () =>{
            setLoading(true)
            try{
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/edit`,
                formData,
                config)

                if(res.status === 200){
                    if(new_slug!==''){
                        await get_blog(new_slug)
                        navigate(-1)
                    }else{
                        await get_blog(slug)
                    }
                    setFormData({
                        title:'',
                        new_slug:'',
                        description:'',
                        content:'',
                    })
                    setLoading(false)
                    setUpdateTitle(false)
                    setUpdateSlug(false)
                    setUpdateDescription(false)
                    setUpdateContent(false)
                    if(content){
                        setContent('')
                    }
                }else {
                    setLoading(false)
                    setUpdateTitle(false)
                    setUpdateSlug(false)
                    setUpdateDescription(false)
                    setUpdateContent(false)
                    if(content){
                        setContent('')
                    }
                }
            }catch(err){
                setLoading(false)
                setUpdateTitle(false)
                setUpdateSlug(false)
                setUpdateDescription(false)
                setUpdateContent(false)
                if(content){
                    setContent('')
                }
                alert('Error al enviar')
            }
        }
        fetchData()
    }

    return(
        <Layout>
            <Helmet>
                <title>Relaxadina | Administracion</title>
                <meta name="description" content="Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones." />
                <meta name="keywords" content='agencia de software, agencia de marketing, creacion de pagina web' />
                <meta name="robots" content='all' />
                <link rel="canonical" href="https://www.Relaxadina.com/" />
                <meta name="author" content='Relaxadina' />
                <meta name="publisher" content='Relaxadina' />

                {/* Social Media Tags */}
                <meta property="og:title" content='Relaxadina | Software Agency' />
                <meta property="og:description" content='Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones.' />
                <meta property="og:url" content="https://www.Relaxadina.com/" />
                <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

                <meta name="twitter:title" content='Relaxadina | Software Agency' />
                <meta
                    name="twitter:description"
                    content='Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones.'
                />
                <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {
                post && isAuthenticated ?
                <>              
                {/* Panel de edicion */}
                <div>
                    {/* BOTONES */}
                    <div className=" px-4 py-5 sm:px-6">
                    <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="ml-4 mt-4">
                            <h3 className="text-3xl font-medium leading-6 text-gray-900">Panel de Edición. </h3>
                            <p className="mt-3 text-lg text-gray-500">
                                Edita la Publicación: "{post.title}"
                            </p>
                        </div>
                        <div className="ml-4 mt-4 flex-shrink-0">
                            <button
                                type="button"
                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Publicar.
                            </button>
                            <button
                                type="button"
                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Revisar.
                            </button>
                            <button
                                type="button"
                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-pink-300 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Borrar.
                            </button>
                        </div>
                    </div>
                </div>
                </div>

            <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                {/* CAMBIO DE TITULO, TITLE */}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-lg font-medium text-gray-500">Titulo:</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {
                            updateTitle ?
                            <>
                            <form onSubmit={e=>onSubmit(e)} className="flex w-full">                               
                                <span className="flex-grow">
                                    <input
                                    value={title}
                                    onChange={e=>onChange(e)}
                                    name='title'
                                    type='text'
                                    className="border border-gray-400 rounded-lg w-full"
                                    required
                                    />
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                    type="submit"
                                    className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Guardar
                                    </button>
                                    <div
                                    onClick={()=>setUpdateTitle(false)}
                                    className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Cancelar
                                    </div>
                                </span>
                            </form>
                            </>:
                            <>
                            <span className="flex-grow text-lg">{post.title}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                onClick={()=>setUpdateTitle(true)}
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                Actualizar
                                </button>
                            </span>
                            </>
                        }
                    </dd>
                </div>

                {/* CAMBIO DE CATEGORIA, SLUG */}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-lg font-medium text-gray-500">Categoria:</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {
                            updateSlug ?
                            <>
                            <form onSubmit={e=>onSubmit(e)} className="flex w-full">                               
                                <span className="flex-grow">
                                    <input
                                    value={new_slug}
                                    onChange={e=>onChange(e)}
                                    name='new_slug'
                                    type='text'
                                    className="border border-gray-400 rounded-lg w-full"
                                    required
                                    />
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                    type="submit"
                                    className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Guardar
                                    </button>
                                    <div
                                    onClick={()=>setUpdateSlug(false)}
                                    className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Cancelar
                                    </div>
                                </span>
                            </form>
                            </>:
                            <>
                            <span className="flex-grow text-lg">{post.slug}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                onClick={()=>setUpdateSlug(true)}
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                Actualizar
                                </button>
                            </span>
                            </>
                        }
                    </dd>
                </div>
                
                {/* CAMBIO DE DESCRIPCION, DESCRIPTION */}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-lg font-medium text-gray-500">Descripción:</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {
                            updateDescription ?
                            <>
                            <form onSubmit={e=>onSubmit(e)} className="flex w-full">                               
                                <span className="flex-grow">
                                    <textarea
                                    rows={3}
                                    value={description}
                                    onChange={e=>onChange(e)}
                                    name='description'
                                    type='text'
                                    className="border border-gray-400 rounded-lg w-full"
                                    required
                                    />
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                    type="submit"
                                    className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Guardar
                                    </button>
                                    <div
                                    onClick={()=>setUpdateDescription(false)}
                                    className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Cancelar
                                    </div>
                                </span>
                            </form>
                            </>:
                            <>
                            <span className="flex-grow text-lg">{post.description}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                onClick={()=>setUpdateDescription(true)}
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                Actualizar
                                </button>
                            </span>
                            </>
                        }
                    </dd>
                </div>

                {/* CAMBIO DE CONTENIDO. CONTENT */}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-lg font-medium text-gray-500">Contenido:</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {
                            updateContent ?
                            <>
                            <form onSubmit={e=>onSubmit(e)} className="w-full">                               
                                <span className="flex-grow">
                                    <CKEditor
                                    editor={ClassicEditor}
                                    data={content}
                                    onChange={(event, editor) =>{
                                        const data = editor.getData()
                                        setContent(data)
                                    }}
                                    />
                                </span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                    type="submit"
                                    className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Guardar
                                    </button>
                                    <div
                                    onClick={()=>setUpdateContent(false)}
                                    className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                    Cancelar
                                    </div>
                                </span>
                            </form>
                            </>:
                            <>
                            <span className="flex-grow text-lg">
                                <div className="prose prose-lg max-w-6xl prose-indigo mx-auto mt-6 text-gray-500">
                                    {
                                        showFullContent ?
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content)}} />                
                                        :
                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.length) > 350 ? DOMPurify.sanitize(post.content.slice(0,600)): DOMPurify.sanitize(post.content)}} />                
                                    }
                                    {
                                        showFullContent ?
                                        <button onClick={()=>setShowFullContent(false)}
                                        className="w-full bg-gray-200 font-medium text-black hover:text-indigo-500">
                                            Mostrar menos
                                        </button>
                                        :
                                        <button onClick={()=>setShowFullContent(true)}
                                        className="w-full bg-gray-200 font-medium text-black hover:text-indigo-500"> 
                                            PICALE = *-* Mostrar mas *-* = PICALE
                                        </button>
                                    }
                                </div>
                            </span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                onClick={()=>setUpdateContent(true)}
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                Actualizar
                                </button>
                            </span>
                            </>
                        }
                    </dd>
                </div>

                </dl>
            </div>             
                </>
                :
                <>Cargando</>
            }
        </Layout>
    )
}

const mapStateToProps = state => ({
    post: state.blog.post,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{
    get_blog
})(EditPost)
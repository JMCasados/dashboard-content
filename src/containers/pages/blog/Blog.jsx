import BlogList from "components/blog/BlogList"
import Layout from "hocs/layout/Layout"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { connect } from "react-redux"
import { get_author_blog_list, get_author_blog_list_page } from "redux/actions/blog/blog"
import { get_categories } from "redux/actions/categories/categories"

function Blog({
    get_author_blog_list,
    get_author_blog_list_page,
    posts,
    count,
    next,
    previous,
    get_categories,
    categories
}){

    useEffect(()=> {
        get_author_blog_list()
        get_author_blog_list_page()
        get_categories()
    },[])

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
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-3xl font-medium leading-6 text-gray-900">Administración del Blog.</h3>
                        <p className="mt-3 text-lg text-gray-500">
                            Crea o Edita las publicaciones del blog.
                        </p>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <button
                            type="button"
                            className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Crea un nuevo post.
                        </button>
                    </div>
                </div>
            </div>
            <BlogList posts={posts&&posts} get_blog_list_page={get_author_blog_list_page} count={count&&count}/>
        </Layout>
    )
}

const mapStateToProps = state => ({
    posts: state.blog.author_blog_list,
    categories: state.categories.categories,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,
})
export default connect(mapStateToProps,{
    get_author_blog_list,
    get_author_blog_list_page,
    get_categories
})(Blog)
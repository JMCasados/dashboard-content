import Layout from "hocs/layout/Layout"
import { connect } from "react-redux"
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from "react"
import { login, check_authenticated, load_user, refresh, reset_password } from "redux/actions/auth/auth"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { EnvelopeIcon } from "@heroicons/react/24/outline"

function ResetPassword({
  reset_password,
  isAuthenticated,
  loading,
  check_authenticated,
  load_user,
  refresh
}){

  useEffect(() => {
    isAuthenticated ? <></>:
    <>
      {check_authenticated()}
      {refresh()}
      {load_user()}
    </>
  },[])

    const [formData, setFormData] = useState({
        email: ''
    });

    const {
        email
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email)
        navigate('/')
    }

    if (isAuthenticated){
      return <Navigate to='/dashboard'/>
    }


    return(
        <>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <h1 className="mt-2 text-center text-sm text-gray-600">Relaxadina</h1> */}
            <img
              className="mx-auto h-12 w-auto"
              src="https://relaxadina.com/ws/media-library/f0c86710366140eeac033a97bf39de1a/logo-trans.png"
              alt="Your Company"
            />
          </div>
          <form onSubmit={e=>{onSubmit(e)}} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={email}
                  onChange={e=>onChange(e)}
                  type="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              
            </div>

            <div className="flex items-center justify-between">

              <div className="text-sm">
                <span>Ya tienes una cuenta?</span>
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
        </>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})
export default connect(mapStateToProps,{
  reset_password,
  check_authenticated,
  load_user,
  refresh  
})(ResetPassword)
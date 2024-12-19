import { Toast } from "primereact/toast"
import { useRef } from "react"

const Login = () => {
  const toast = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const users = localStorage.getItem('users')
    const form = document.querySelector('form')
    if(users === null) {
      toast.current.show({severity: 'error', summary: 'Error', detail: 'User not found'})
      localStorage.setItem('admin', JSON.stringify([{username: 'admin', password: 'admin'}]))
    } else {
      const username = e.target[0].value
      const password = e.target[1].value
      const user = JSON.parse(users).find(user => user.username === username && user.password === password)
      if(user) {
        window.location.href = '/admin'
      } else {
        toast.current.show({severity: 'error', summary: 'Error', detail: 'User not found'})
        form.reset()
      }
    }
     
  }
  return (
    <>
      <div className="bg-primary h-screen w-screen flex justify-center items-center" onSubmit={handleSubmit}>
      <Toast ref={toast} className="boder-2 border-white"/> 
        <div>
          <form>
            <div className="flex flex-col items-center">
              <img src="/images/logo-kruger-white.svg" alt="Kruger logo" className="w-32" />
              <h1 className="text-white text-3xl font-bold mt-8">Welcome to PowerMap</h1>
              <input type="text" placeholder="Username" className="bg-white w-80 h-10 mt-4 p-2 rounded-lg" />
              <input type="password" placeholder="Password" className="bg-white w-80 h-10 mt-4 p-2 rounded-lg" />
              <button type="submit" className="bg-white w-80 h-10 mt-4 p-2 border-2 border-white rounded-lg text-primary font-bold hover:bg-primary hover:text-white transition duration-300">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
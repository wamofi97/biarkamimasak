import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
    return (
        <div className="max-w-6xl min-h-screen mx-auto flex items-center justify-center">
            <SignUp path="/sign-up" />
        </div>
    ) 
}

export default SignUpPage
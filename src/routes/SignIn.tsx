import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div className="max-w-6xl min-h-screen mx-auto flex items-center justify-center">
        <SignIn path="/sign-in" />
    </div>
) 
}
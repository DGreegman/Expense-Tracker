import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
    return ( 

        <div className="guest">
            <h1>Welcome</h1>
            <p>Please Sign In to Mange Your Transactions</p>
            <SignInButton />
        </div>
     );
}
 
export default Guest;
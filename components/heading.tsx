import {ReactNode} from "react";

const Heading = ({ children, textSize = 'text-6xl'}: { children: ReactNode, textSize?: string }) => {
    return (
        <h1 className={`text-primary font-extrabold tracking-tight text-left ${textSize}`}>
            {children}
        </h1>
    )
}

export default Heading
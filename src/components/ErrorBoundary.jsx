import { Component } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {}

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-customdark text-customText grid gap-y-3 justify-center mt-56">
                    <RiErrorWarningFill className="text-5xl sm:text-6xl md:text-7xl justify-self-center" />
                    <p className="text-base sm:text-lg md:text-xl xl:text-2xl">
                        Something went wrong!
                    </p>
                    <p className="justify-self-center font-semi md:text-lg">
                        <i> try it later</i>
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

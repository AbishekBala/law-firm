import { Typewriter } from "@/components/ui/typewriter-text"

const DemoVariant1 = () => {
    return (
        <>
            <Typewriter
                text={["Welcome to Legal Services", "Expert Legal Solutions", "Professional Legal Advice"]}
                speed={100}
                loop={true}
                className="text-xl font-medium"
            />
        </>
    )
}

const DemoVariant2 = () => {
    return (
        <>
            <Typewriter
                text="Single line typewriter effect"
                speed={80}
                loop={false}
                className="text-lg text-blue-600"
            />
        </>
    )
}

export { DemoVariant1, DemoVariant2 }
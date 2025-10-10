import Button from "../../components/Button";

export default function Dashboard() {
    return(
        <div className="flex flex-col justify-center items-center h-screen w-full gap-8"> 
            <p>Dashboard</p>
            <Button variant="primary" size="lg" onClick={() => {}}>
                <p>Logout</p>
            </Button>
        </div>
    )
}
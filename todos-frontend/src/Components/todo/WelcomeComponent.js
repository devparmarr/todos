import { useParams, Link} from 'react-router-dom';


export default function WelcomeComponent() {
    const {username } = useParams()


    return (
        <div className="WelcomeComponent container d-flex-column">
            <h1>Welcome {username}</h1>
            <div className="my-3">
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            
        </div>
    )
}
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
const users = [
    {
        userName: "ionatibia",
        name: "Iker Oñatibia",
        isFollowing: true,
    },
    {
        userName: "natiexperiencia",
        name: "Nati Experiencia",
        isFollowing: true,
    },
    {
        userName: "nati-data-ka",
        name: "Nati Dataka",
        isFollowing: false,
    },
    {
        userName: "midudev",
        name: "Miguel Ángel Durán",
        isFollowing: false,
    },
    {
        userName: "iborrezo",
        name: "Igor Borrezo",
        isFollowing: true,
    },
    {
        userName: "jaceituno",
        name: "Jose Aceituno",
        isFollowing: true,
    },
];
export function App() {
    return (
        <>
            <section className="App">
                {users.map((user) => {
                    if (user.userName === "nati-data-ka") return;
                    const { userName, name, isFollowing } = user;
                    return (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    );
                })}
            </section>
        </>
    );
}

import todos from "@/app/api/todos/route";
import HomeComponent from "@/app/Components/Home";

export default async function Home() {

  const data = await todos.getAll().then((x)=>x.data)

  return (
    <main>
      <HomeComponent data={data} />
    </main>
  )
};

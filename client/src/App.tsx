import { useState } from 'react'
import DreamOutput from './components/DreamOutput'
import Header from './components/Header'
import PromptForm from './components/PromptForm'
import './App.css';

type Qwerty = {
  image: string
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageDesc, setImageDesc] = useState<string>('');

  const generateImage = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost/api/dream', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          prompt
        }),
      });

      if (response?.ok) {
        const { image } = (await response.json()) as Qwerty;
        setImageUrl(image);
        setImageDesc(prompt);
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log((e as Error).message);
    }
    setIsLoading(false);
  };

  return (
    <div className="container | surface1">
      <Header />
      <main className='main'>
        <DreamOutput imageDesc={imageDesc} imageUrl={imageUrl} />
        <PromptForm isLoading={isLoading} onSubmit={generateImage} />
      </main>
    </div>
  )
}

export default App

import { Button } from "../../components/Button";
import LazyImage from "../../components/LazyImg";
import { AboutContainer, AboutContent } from "./styles";

export function About() {
  // useEffect(() => {
  //   confetti({
  //     particleCount: 600,
  //     spread: 800,
  //     origin: { y: 0.5 },
  //   });
  // }, []);
  return (
    <AboutContainer>
      <LazyImage
        src='image.png'
        alt='Logo de Karen Frazão'
        className='puff-in-center'
        loading='eager'
        fetchPriority='high'
        width={150}
        height={150}
      />
      <AboutContent>
        <div className='text'>
          <h1 className='tracking-in-expand-fwd'>Karen Frazão</h1>
          <h2 className='tracking-in-expand-fwd'>Fabulos Hair</h2>
          <p className='tracking-in-expand-fwd'>Saúde e Beleza</p>
        </div>
        <Button
          width='md'
          href='#cta'
          size='small'
          backgroundColor='transparent'
        >
          Saiba mais
        </Button>
      </AboutContent>
    </AboutContainer>
  )
}

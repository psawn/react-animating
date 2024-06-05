import Header from '../components/Header';
import Challenges from '../components/Challenges';
import ChallengesContextProvider from '../store/challenges-context';

export default function ChallengesPage() {
  return (
    <ChallengesContextProvider>
      <Header />
      <main>
        <Challenges />
      </main>
    </ChallengesContextProvider>
  );
}

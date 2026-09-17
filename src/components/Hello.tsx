import { useState } from 'react';

// ponytail: proof that React islands hydrate; replace with a real component
export default function Hello() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Clicked {n} times</button>;
}

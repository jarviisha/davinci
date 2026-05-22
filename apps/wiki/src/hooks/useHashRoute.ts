import { useEffect, useState } from "react";

function readHash<T extends string>(ids: readonly T[], fallback: T): T {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return (ids as readonly string[]).includes(raw) ? (raw as T) : fallback;
}

export function useHashRoute<T extends string>(
  ids: readonly T[],
  fallback: T
): [T, (id: T) => void] {
  const [id, setId] = useState<T>(() => readHash(ids, fallback));

  useEffect(() => {
    const onChange = () => setId(readHash(ids, fallback));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, [ids, fallback]);

  const navigate = (next: T) => {
    if (window.location.hash === `#/${next}`) {
      return;
    }
    window.location.hash = `#/${next}`;
  };

  return [id, navigate];
}
